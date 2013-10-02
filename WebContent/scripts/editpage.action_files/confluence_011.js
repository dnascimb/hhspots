AJS.Editor = (function($) { return {
    // Save the last edit mode in case the user changes to preview and from there to the other edit mode...
    // then we will have to convert the markup to XHTML or vice verca.
    lastEditMode: null,
    lastKnownGoodContent: null,
    contentHasChangedSinceLastAutoSave: false,

    syncTitleFieldWithForm: function() {
        var hiddenContentTitle = AJS.$("#hidden-content-title");
        if (hiddenContentTitle.length) {
            // Title field has been moved out of form to top of page,
            // copy the current field value into hidden field if value written.
            var title = "";

            var titleWrittenField = AJS.$("#titleWritten");
            if (!titleWrittenField.length || titleWrittenField.val() != "false") {
                // Creating a page - title may be "New Page" as placeholder, don't copy.
                title = AJS.$("#content-title").val();
            }

            hiddenContentTitle.val(title);
        }
    },

    // Save/Cancel fire unload, but draft shouldn't be saved.
    isSubmitting: false,

    // Flag used to determine if handleUnload function should run.
    isUnloaded: false,

    hasContentChanged : function () {
        return this.contentHasChangedSinceLastAutoSave || (AJS.params.useWysiwyg && (this.inRichTextMode() && this.Adapter.editorHasContentChanged()));
    },

    saveDraft: function (async) {
        if (!AJS.params.saveDrafts || AJS.Editor.isSubmitting || !AJS.Editor.hasContentChanged()) {
            return;
        }
        if (typeof async != "boolean") {
            async = true;
        }
        AJS.Editor.syncTitleFieldWithForm();
        var form = AJS.Editor.getCurrentForm();
        var draftData = {
            pageId : AJS.params.pageId,
            type : AJS.params.draftType,
            title : AJS.$("#hidden-content-title").val(),
            content : AJS.Editor.getCurrentFormContent(form)
        };

        var newSpaceKey = AJS.$("#newSpaceKey");
        if (newSpaceKey.length) {
            draftData.spaceKey = newSpaceKey.val();
        }
        else {
            draftData.spaceKey = escape(AJS.params.spaceKey);
        }
        var originalVersion = AJS.$("#originalVersion");
        if (originalVersion.length) {
            draftData.pageVersion = parseInt(originalVersion.val(), 10);
        }

        var draftStatus = AJS.$("#draft-status");
        var resetWysiwygContent = AJS.params.useWysiwyg && AJS.Editor.inRichTextMode();

        var jsTime = function (date) { // dodgy time function
            var h = date.getHours();
            var m = date.getMinutes();
            var ampm = h > 11 ? "PM" : "AM";
            h = h % 12;
            return (h == 0 ? "12" : h) + ":" + (m < 10 ? "0" : "") + m + " " + ampm;
        };

        var resetContentChanged = function (response) {
            AJS.Editor.contentHasChangedSinceLastAutoSave = false;
            if (resetWysiwygContent) {
                AJS.Editor.Adapter.editorResetContentChanged();
            }
            if (response.success)
            {
                var detail = {};
                try {
                    detail = eval("(" + response.response + ")");
                } catch (e) {
                    // ignore exception in eval
                }
                var time = detail.time || jsTime(new Date());
                draftStatus.removeClass("error");
                draftStatus.html(AJS.format(AJS.params.draftSavedMessage, time));
                if (!AJS.params.contentId || AJS.params.contentId === "0")
                    AJS.params.contentId = detail.draftId;
            } else {
                draftStatus.addClass("error");
                draftStatus.html(response.response);
            }
        };
        draftStatus.html(AJS.params.draftSavingMessage);
        DraftAjax.saveDraft(draftData, form.xhtml.value == "true", {
            callback: resetContentChanged,
            async: async,
            errorHandler: function () { resetContentChanged({ success: false, response: AJS.params.draftSavingTimedOutMessage }); },
            timeout: 30000 // 30 seconds
        });
    },

    // function to send the form to discard/use the draft
    sendFormDraft: function(flagName) {
        var form = this.getCurrentForm();

        this.addHiddenElement(form, flagName, "true");
        this.addHiddenElement(form, "contentChanged", "" + this.hasContentChanged());
        this.addHiddenElement(form, "pageId", AJS.params.pageId);
        if (!form.spaceKey) {
            this.addHiddenElement(form, "spaceKey", AJS.params.spaceKey);
        }

        form.action =  (AJS.params.newPage ? "create" : "edit") + AJS.params.draftType + ".action";
        form.submit();
    },

    addHiddenElement : function (form, name, value) {
        var el = document.createElement("input");
        el.type = "hidden";
        el.name = name;
        el.value = value;
        form.appendChild(el);
    },

    getCurrentFormContent : function(form) {
        if (AJS.params.useWysiwyg && form.xhtml.value == 'true') {
            return this.Adapter.getEditorHTML();
        }
        if (form.markupTextarea) {
            return form.markupTextarea.value;
        }
    },

    /* This function will be invoked when the form gets submitted. */
    contentFormSubmit: function(e) {
        this.syncTitleFieldWithForm();

        AJS.$("#locationShowing").val("" + AJS.isVisible("#location_div"));
        AJS.$("#labelsShowing").val("" + AJS.isVisible("#labels_div"));

        // The permissions div may not appear if the user isn't able to assign permissions (e.g. anonymous)
        if(AJS.$("#permissionsDiv").css("display") == "block") {
            AJS.$("#restrictionsShowing").val("true");
        }

        // CONF-12750 Disable the title field outside the form
        // to prevent Safari 2.0 from sending the "title" field twice
        AJS.$(".editable-title #content-title").attr("disabled","disabled");

        this.isSubmitting = this.checkCaptchaResponse(e);
        return this.isSubmitting;
    },

    // Method checks whether the captchaResponse textfield is empty.
    checkCaptchaResponse: function(e) {
        if (e.target.name == "cancel") {
            return true;
        }

        var captchaTextField = AJS.$("#captchaResponse");

        if (captchaTextField.val() == "") {
            AJS.$("#captchaError").css("display", "block");
            window.scroll(0, 0);
            e.stopPropagation();
            return false;
        }
        return true;
    },

    heartbeat: function() {
        HeartbeatAjax.startActivity(AJS.params.pageId, AJS.params.draftType,
            function(activityResponses) {
                var otherUsersAreEditing = activityResponses.length;
                if (otherUsersAreEditing) {
                    var outerspan = AJS.$("#other-users-span");
                    outerspan.empty();
                    for (var i = 0; i < otherUsersAreEditing; ++i) {
                        if (i > 0) {
                            outerspan.append(", ");
                        }

                        var activityResponse = activityResponses[i];
                        outerspan.append(AJS('a').attr('href', AJS.params.contextPath + '/display/~' + encodeURIComponent(activityResponse.userName)).text(activityResponse.fullName));
                        if (activityResponse.lastEditMessage != null) {
                            outerspan.append(" ").append(AJS('span').addClass('smalltext').text(activityResponse.lastEditMessage));
                        }
                    }
                }
                AJS.setVisible("#heartbeat-div", !!otherUsersAreEditing);
            }
        );
    },

    disableFrame: function(body) {
        //disable all forms, buttons and links in the iframe
        AJS.$("form", body).each(function() {
            AJS.$(this).unbind();
            this.onsubmit = function() {
                return false;
            };
        });
        AJS.$("a", body).each(function() {
            AJS.$(this).attr("target", "_top").unbind();
        });
        AJS.$("input", body).each(function() {
            AJS.$(this).unbind();
        });
    },

    /* This function should be invoked when the preview frame has finished loading its content.
       It is responsible for updating the height of frame body to the actual content's height.
      */
    previewFrameOnload: function (body, iframe) {
        AJS.Editor.disableFrame(body);
        var $iframe = AJS.$(iframe || "#previewArea iframe"),
            prevHeight = 0,
            counter = 0;

        (function () {
            if (prevHeight < body.scrollHeight) {
                $iframe.height(Math.max(body.scrollHeight, $iframe.height()) + "px");
                prevHeight = body.scrollHeight;
                counter = 0;
            } else {
                counter++;
            }
            // uppper limit check for content height changes
            if (counter < 500) {
                setTimeout(arguments.callee, 500);
            }
        })();
    },

    showRichText : function (show) {
        if (!AJS.params.useWysiwyg)
            return;

        AJS.setVisible("#wysiwyg", show);
        AJS.setCurrent("#wysiwygTab", show);

        if (show) {
            this.Adapter.onShowEditor();
            // now we are in rich text mode, and may change the content, so any value in lastKnownGoodContent is obsolete
            this.lastKnownGoodContent = null;
        }
        else {
            this.Adapter.onHideEditor();
        }
    },

    showMarkup: function (show) {
        var form = this.getCurrentForm(),
            fname1 = (show ? "removeClass" : "addClass"),
            fname2 = (show ? "addClass" : "removeClass");
        AJS.$("#markup")[fname1]("hidden");
        AJS.$("#markupTab")[fname2]("current");
        AJS.$("#sidebar")[fname1]("hidden");
        AJS.$(form)[fname2]("markup");
        AJS.$("#linkinserters")[fname1]("hidden");
    },

    showPreview : function (show) {
        var fname1 = (show ? "removeClass" : "addClass"),
            fname2 = (show ? "addClass" : "removeClass");
        AJS.$("#preview")[fname1]("hidden");
        AJS.$("#previewTab")[fname2]("current");
    },

    /**
    * Set up the page for rich text or markup editing
    */
    setMode : function(mode) {
        var wasRichText = this.inRichTextMode();
        var form = this.getCurrentForm();

        if (mode != AJS.params.actionPreview) {
            AJS.$("input[name=xhtml]", this.getCurrentForm()).val(mode == AJS.params.actionRichtext);
        }

        if (AJS.params.remoteUser && AJS.params.useWysiwyg) {
            this.showDefaultEditorLinks(mode);
        }

        // DON'T CHANGE THE ORDERING OF SHOWS
        // FIREFOX RENDERING GLITCHES WHEN PAGE LOADS TOO QUICKLY (if showMarkup() isn't first)
        if (mode == AJS.params.actionRichtext) {
            this.showMarkup(false);
            this.showRichText(true);
            this.showPreview(false);
        }
        else if (mode == AJS.params.actionMarkup) {
            this.showMarkup(true);
            this.showRichText(false);
            this.showPreview(false);
        }
        else if (mode == AJS.params.actionPreview) {
            if (wasRichText) {
                // get the editor content in case we come back to wiki-markup
                this.lastKnownGoodContent = this.Adapter.getEditorHTML();
            }
            this.showPreview(true);
            this.showRichText(false);
            this.showMarkup(false);
        }

        AJS.$("input[name=mode]", form).val(mode);
    },

    getContentId : function() {
        return  AJS.params.contentId || "0"; // sanity check - should always be "0" or an actual id.
    },

    changeMode : function(newMode) {

        //## allowModeChange() only exists when WYSIWYG is enabled, so don't do a check otherwise (CONF-4935)
        // if the editor is in a state where the mode chnage will break things (e.g. not yet fully initialised)
        // don't allow the change
        if (AJS.params.useWysiwyg && this.inRichTextMode() && !AJS.Editor.Adapter.allowModeChange()) {
            return false;
        }

        var oldMode = AJS.$("input[name=mode]", this.getCurrentForm()).val();
        if (oldMode == newMode) {
            return false;
        }

        this.showWaitImage(true);

        if (AJS.params.saveDrafts) {
            // If the contentId is "0" we want to make sure we
            // save the draft before loading the content.
            var async = (AJS.params.contentId && AJS.params.contentId !== "0");
            this.saveDraft(async);
        }

        var contentId = this.getContentId();
        if (newMode == AJS.params.actionMarkup) {
            if (oldMode == AJS.params.actionPreview) {
                if (AJS.Editor.lastEditMode == AJS.params.actionMarkup) { // Markup -> Preview -> Markup (no conversion)
                    this.replysetTextArea(null);
                }
                else { // WYSIWYG -> Preview -> Markup (convert HTML to wiki markup)
                    WysiwygConverter.convertXHtmlToWikiMarkupWithoutPage(AJS.Editor.lastKnownGoodContent, contentId, this.replysetTextArea);
                }
            }
            else { // WYSIWYG -> Markup, so just convert
                WysiwygConverter.convertXHtmlToWikiMarkupWithoutPage(AJS.Editor.Adapter.getEditorHTML(), contentId, this.replysetTextArea);
            }
        }
        else if (newMode == AJS.params.actionRichtext) {
            // If the current mode is preview...
            if (oldMode == AJS.params.actionPreview && AJS.Editor.lastEditMode == AJS.params.actionRichtext) {
                // WYSIWYG -> Preview -> WYSIWYG
                // We don't need to reload or convert the contents of the tinyMCE editor
                this.replysetEditorValue(null);
            } else {
                // Markup -> Preview -> WYSIWYG
                // Convert the markup to be used with WYSIWYG
                // Markup -> WYSIWYG, so just grab the contents of the markup textarea and convert it to be used with WYSIWYG
                WysiwygConverter.convertWikiMarkupToXHtmlWithoutPageWithSpaceKey(AJS.$("#markupTextarea").val(), contentId, AJS.params.spaceKey, this.replysetEditorValue);
            }
        }
        else { // Preview
            var queryParams = { "contentId": contentId,
                                "contentType": AJS.params.contentType,
                                "spaceKey": AJS.params.spaceKey,
                                "onloadFunction": "top.AJS.Editor.previewFrameOnload"};

            if (oldMode == AJS.params.actionRichtext) { // WYSIWYG -> Preview
                AJS.Editor.lastEditMode = AJS.params.actionRichtext;
                AJS.Editor.lastKnownGoodContent = queryParams.xHtml = AJS.Editor.Adapter.getEditorHTML();
            }
            else { // Markup -> Preview
                AJS.Editor.lastEditMode = AJS.params.actionMarkup;
                queryParams.wikiMarkup = AJS.$("#markupTextarea").val();
            }

        AJS.$.post(AJS.params.contextPath + "/pages/rendercontent.action", queryParams, AJS.Editor.replysetPreviewArea);
        }

        return false;
    },

    showWaitImage : function (flag) {
        AJS.$("#wysiwygWaitImage").css("visibility", (flag ? "visible" : "hidden"));
    },

    replysetTextArea : function (s) {
        AJS.Editor.showWaitImage(false);
        AJS.Editor.setMode(AJS.params.actionMarkup);
        if (s != null) {
            AJS.$("#markupTextarea").val(s);
        }
    },

    replysetEditorValue : function (s) {
        AJS.Editor.showWaitImage(false);
        AJS.Editor.setMode(AJS.params.actionRichtext);
        AJS.Editor.Adapter.setEditorValue(s);
    },

    replysetPreviewArea : function (html) {
        AJS.Editor.showWaitImage(false);
        AJS.Editor.setMode(AJS.params.actionPreview);
        // Set the iframe source to an empty JS statement to avoid secure/nonsecure warnings on https, without
        // needing a back-end call.
        var src = AJS.params.staticResourceUrlPrefix + "/blank.html";
        AJS.$("#previewArea").html('<iframe src="' + src + '" scrolling="no" frameborder="0"></iframe>');
        var iframe = AJS.$("#previewArea iframe")[0];
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.write(html);
        doc.close(); // for firefox
    },

    inRichTextMode : function () {
        return AJS.$("input[name=mode]", this.getCurrentForm()).val() == AJS.params.actionRichtext;
    },

    // Called by Adapter oninit
    onInit : function () {
        AJS.Editor.setMode(AJS.params.editorMode);
    },

    handleUnload : function() {
        if (AJS.Editor.isUnloaded)
            return;

        AJS.Editor.isUnloaded = true;
        if (AJS.params.saveDrafts) {
            AJS.Editor.saveDraft(false);
        }
    },

    storeTextareaBits : function () {
        return AJS.Editor.Markup.storeTextareaBits(this.getCurrentForm(), AJS.$("#markupTextarea")[0]);
    },

    setRichTextDefault : function (value) {
        AjaxUserProfileEditor.setPreferenceUserEditWysiwyg(value);
        AJS.Editor.editorPreference = (value ? AJS.params.actionRichtext : AJS.params.actionMarkup);
        AJS.$("#makeRichTextDefault").addClass("hidden");
        AJS.$("#makeMarkupDefault").addClass("hidden");
    },

    // Hide and show the "make default" editor links, based on what mode the user is currently in
    showDefaultEditorLinks : function (currentMode) {
        var defaultIsWysiwyg = (AJS.Editor.editorPreference == AJS.params.actionRichtext);
        var showRichTextDefault, showMarkupDefault = false;

        // If we are in MARKUP mode, show the text to set markup as default
        if (defaultIsWysiwyg && currentMode == AJS.params.actionMarkup) {
            showMarkupDefault = true;
        }
        // If we are in RICHTEXT mode, show the text to set richtext as default
        else if (!defaultIsWysiwyg && currentMode == AJS.params.actionRichtext) {
            showRichTextDefault = true;
        }

        AJS.$("#makeRichTextDefault")[showRichTextDefault ? "removeClass" : "addClass"]("hidden");
        AJS.$("#makeMarkupDefault")[showMarkupDefault ? "removeClass" : "addClass"]("hidden");
    },

    contentChangeHandler : function () {
        this.contentHasChangedSinceLastAutoSave = true;
    },

    getCurrentForm : function() {
        return AJS.$("form[name=" + AJS.params.formName + "]")[0];
    },

    openMacroBrowser : function(e) {
        var t = AJS.Editor,
            mb = AJS.MacroBrowser,
            textarea = $("#markupTextarea");

        // store the current selection & scroll for later when we insert macro
        var range = t.Markup.selection = textarea.selectionRange();
        t.Markup.scrollTop = textarea.scrollTop();

        var selectedMacro = mb.getSelectedMacro(range.textBefore, textarea.val());
        mb.open({
            markupMode : true,
            selectedMacro : selectedMacro,
            selectedMarkup : range.text,
            onComplete : AJS.Editor.macroBrowserComplete,
            onCancel : AJS.Editor.macroBrowserCancel
        });
        return AJS.stopEvent(e);
    },

    // Constructs and inserts the macro markup from the insert macro page.
    macroBrowserComplete : function(macro) {
        var t = AJS.Editor,
            textarea = $("#markupTextarea"),
            m = AJS.MacroBrowser.selectedMacro;
        if (m) { // select and replace the current macro markup
            textarea.selectionRange(m.startIndex, m.startIndex + m.markup.length);
        }
        else if (t.Markup.selection) {
            textarea.selectionRange(t.Markup.selection.start, t.Markup.selection.end);
        }
        textarea.selection(macro.markup);
        textarea.scrollTop(t.Markup.scrollTop);
    },
    macroBrowserCancel : function() {
        var t = AJS.Editor,
            textarea = $("#markupTextarea");
        if (t.Markup.selection) {
            textarea.selectionRange(t.Markup.selection.start, t.Markup.selection.end);
        }
        textarea.scrollTop(t.Markup.scrollTop);
    }
};})(AJS.$);

AJS.toInit(function ($) {

    AJS.Editor.editorPreference = AJS.params.editorMode;

    $("#wysiwygTab a:first").click(function (e) {
        AJS.Editor.changeMode(AJS.params.actionRichtext);
        return AJS.stopEvent(e);
    });

    $("#markupTab a:first").click(function (e) {
        AJS.Editor.changeMode(AJS.params.actionMarkup);
        return AJS.stopEvent(e);
    });

    $("#previewTab a:first").click(function (e) {
        AJS.Editor.changeMode(AJS.params.actionPreview);
        return AJS.stopEvent(e);
    });

    $("#makeRichTextDefault").click(function (e) {
        AJS.Editor.setRichTextDefault(true);
        return AJS.stopEvent(e);
    });

    $("#makeMarkupDefault").click(function (e) {
        AJS.Editor.setRichTextDefault(false);
        return AJS.stopEvent(e);
    });

    var openImagePopup = function (e) {
        AJS.Editor.storeTextareaBits();
        var width = (3 * AJS.params.maxThumbWidth) + 100;

        var params = {
            mode: 'search',
            spaceKey: AJS.params.spaceKey,
            formname: AJS.params.formName,
            fieldname: AJS.params.parametersName
        };
        if (-AJS.params.pageId) {
            params.pageId = AJS.params.pageId;
        }
        else {
            params.draftType = AJS.params.draftType;
        }

        var type = (-AJS.params.pageId) ? "page" : "draft";
        var popupUrl = AJS.params.contextPath + "/users/insertimagein" + type + ".action?" + $.param(params);
        var pop = window.open(popupUrl, "link_image_inserter", "width=" + width + ", height=400, resizable, scrollbars=yes");
        return AJS.stopEvent(e);
    };

    var openLinkPopup = function (e) {
        AJS.Editor.storeTextareaBits();
        try {
            AJS.Editor.LinkPopup = {};
        } catch(error) {
            AJS.log(error);
        }

        var params = {
            currentspace: AJS.params.spaceKey,
            formname: AJS.params.formName,
            fieldname: AJS.params.parametersName
        };
        if (-AJS.params.pageId) {
            params.pageId = AJS.params.pageId;
        }
        else {
            params.draftType = AJS.params.draftType;
        }
        var selectedText = $("#selectedText").val();
        if (selectedText) {
            params.alias = selectedText;
        }

        var popupUrl = AJS.params.contextPath + "/users/insertlink.action?" + $.param(params);
        window.open(popupUrl, "link_image_inserter", "width=620, height=480, resizable, scrollbars=yes");
        return AJS.stopEvent(e);
    };

    $("#editor-insert-image").click(openImagePopup);
    $("#editor-insert-link").click(openLinkPopup);
    $("#editor-insert-macro").click(AJS.Editor.openMacroBrowser);

    $("#markupTextarea").select(function () {
        AJS.Editor.storeTextareaBits();
    }).keyup(function (e) {
        AJS.Editor.contentChangeHandler();

        if (e.ctrlKey) {
            if (e.keyCode == 75) // bind ctrl+k to insert link
                return openLinkPopup(e);

            if (e.keyCode == 77) // bind ctrl+m to insert image
                return openImagePopup(e);
        }
    }).keydown(function (e) {
        // prevent firefox's default behaviour
        if (e.ctrlKey && e.keyCode == 75) {
            return AJS.stopEvent(e);
        }
    }).change(function () {
        AJS.Editor.contentChangeHandler();
    });

    $(".submit-buttons").click(function (e) {
        AJS.Editor.contentFormSubmit(e);
    });

    $(".editor-template-link").click(function (e) {
        var form = AJS.$("#createpageform")[0];
        form.action = "createpage-choosetemplate.action";
        AJS.Editor.contentFormSubmit(e);
        form.submit();
    });

    if (AJS.params.useWysiwyg) {
        var errorHandler = function(message) {
            AJS.Editor.showWaitImage(false);
            // Ignore DWR errors because they almost always occur when users
            // click a link or submit during draft/heartbeat transmission.
            // Displaying a message when this occurs is just annoying.
        };
        // Initialisation
        DWREngine.setErrorHandler(errorHandler);
        DWREngine.setWarningHandler(errorHandler);
        // We should note here that the content has NOT finished loading
        AJS.Editor.Adapter.onInitCallback = AJS.Editor.onInit;
        AJS.Editor.Adapter.editorOnLoad();

        $("#wysiwygTextarea").addClass("hidden");
    }

    if (AJS.params.saveDrafts) {
        $(window).unload(AJS.Editor.handleUnload);
        DraftAjax.getDraftSaveInterval(function (interval) {
                setInterval(AJS.Editor.saveDraft, interval);
            }
        );
    }

    if (AJS.params.heartbeat && AJS.params.pageId != "0") {
        AJS.Editor.heartbeat();
        HeartbeatAjax.getHeartbeatInterval(
            function (interval) { setInterval(AJS.Editor.heartbeat, interval); }
        );
    }

    // Move title field to place of title text
    var titleText = $("#title-text");
    var titleField = $("#content-title");
    if (titleText.length && titleField.length) { //only true for edit page screen in default theme
        var div = document.createElement("div");
        $(div).addClass("editable-title");
        $(div).append(titleField);
        if (!$.browser.msie) { // IE can't use full width due to CSS bugs
            $(window).load(function () { // wait until images are loaded
                jQuery(div).css("marginLeft", jQuery("img.logo").width() + 10 + "px"); // adjust for custom logos
            });
        }
        titleText.replaceWith(div);

        // Hidden field title will exist for pages created from links.
        var hiddenFields = $("#hidden-content-title");
        if (!hiddenFields.length) {
            var hiddenField = document.createElement("input");
            hiddenField.id = "hidden-content-title";
            hiddenField.type = "hidden";
            hiddenField.name = "title";
            hiddenField = $(hiddenField);

            var titleWrittenField = $("#titleWritten");
            if (!titleWrittenField.length || titleWrittenField.val() != "false") {
                hiddenField.val(titleField.val());
            }

            var editorDiv = $("#wiki-editor");
            editorDiv.before(hiddenField);
        }
    }
});

AJS.Editor.Markup = {
    // This function stores the selected and unselected text for the textarea in hidden fields on the form
    // This should be called before insertOrUpdateText.
    storeTextareaBits : function (currentForm, textAreaObject) {
        if (textAreaObject.selectionStart != null) {
            // for netscape, mozilla, gecko
            textAreaObject.sel = textAreaObject.value.substr(textAreaObject.selectionStart, textAreaObject.selectionEnd - textAreaObject.selectionStart);
            textAreaObject.sel1 = textAreaObject.value.substr(0, textAreaObject.selectionStart);
            textAreaObject.sel2 = textAreaObject.value.substr(textAreaObject.selectionEnd);
            currentForm.selectedText.value = textAreaObject.sel;
        }
        else {
            if (document.selection && document.selection.createRange) {
                // for ie
                var str = document.selection.createRange().text;
                try {
                    currentForm.elements[AJS.params.parametersName].focus();
                }
                catch (e) {
                // ignore
                }
                var sel = document.selection.createRange();
                currentForm.selectedText.value = sel.text;
            }
        }

        return currentForm.selectedText.value;
    },
    // Inserts text into the text area specified (currently compatible with Netscape, mozilla, ie)
    // Note: for IE compatibility, storeCaret(this) must be called in the onclick, onselect and onkeyup events
    // of the text area object specified
    insertOrUpdateText: function (text, textAreaObject) {
        if (window.getSelection && textAreaObject.selectionStart && textAreaObject.selectionStart != null) {
            textAreaObject.value = textAreaObject.sel1 + text + textAreaObject.sel2;
            textAreaObject.focus();
            textAreaObject.selectionStart = textAreaObject.selectionEnd = textAreaObject.sel1.length + text.length;
        } else if (textAreaObject.createTextRange && textAreaObject.caretPos) {
            // for IE
            // IE supports createTextRange(), test for non-null caretPos (if its been set)
            var caretPos = textAreaObject.caretPos;
            caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? text + ' ' : text;
        } else {
            // for ie users that don't set the caret OR
            // for other browsers
            // just append link at the end of the current text inside the text area
            textAreaObject.value += text;
        }
    }
};