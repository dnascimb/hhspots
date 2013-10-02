AJS.MacroBrowser = (function($) { return {

    metadataMap : {},
    macroDetails: [],
    fields: {}, // stores fields for a given macro form.

    // converts wiki markup into a macro object
    parseMacro : function(macroMarkup) {
        var macroParts = macroMarkup.match(/(\{(.+?)(?::(.*?(?=[^\\]\}).)?)?\})(?:((?:\n|.)*?)\{\2\})?/);
        var macro = {
            markup: macroParts[0], // entire macro markup
            startTag: macroParts[1], // full start tag
            name : macroParts[2], // macro name
            paramStr: macroParts[3],
            bodyMarkup: macroParts[4], // macro bodyMarkup text
            params: {}
        };
        if (macro.paramStr) {
            var paramStrs = macro.paramStr.split("|");
            $(paramStrs).each(function(i, param) {
                var index = param.indexOf("=");
                if (index < 0 && !macro.params[""]) { // unnamed parameter
                    macro.params[""] = param;
                }
                else {
                    macro.params[param.substring(0, index)] = param.substring(index+1);
                }
            });
        }
        return macro;
    },

    // Gets the current selected macro if any.
    // It assumes that the cursor is in the start tag of a macro, if selected.
    getSelectedMacro : function(beforeSelection, wikiText) {
        // Finds all the text before the last '{' but doesn't have a '}'. This also handles escaped '{'s.
        var m = /^(?:.|\n)*[^\\](?={(?:\\}|[^}])+$)/m.exec(" " + beforeSelection + " "); // spaces required for when { is the first or last character
        if (!m) return null;

        var startIndex = m[0].substring(1).length;

        var macro = AJS.MacroBrowser.parseMacro(wikiText.substring(startIndex));
        macro.startIndex = startIndex;
        macro.params = {};
        if (macro.paramStr) {
            // grabs all pairs divided by "=" and separated by "|"
            macro.paramStr.replace(/(?=(?:^|\|)(.*?)(?:=(.*?))?(?:\||$))/g, function (a, name, value) {
                if ((!value || value == "") && !macro.params[""]) { // unnamed parameter
                    macro.params[""] = name;
                } else {
                    macro.params[name] = value;
                }
            });
        }
        return macro;
    },

    // Makes an ajax request to get a macro's parameter info and display the insert macro page.
    showMacroDetails : function(macroName, mode) {
        mode = mode || "insert";
        $.getJSON(AJS.params.contextPath + "/plugins/macrobrowser/macro-details.action",
            { macroName: macroName, mode: mode }, AJS.MacroBrowser.loadMacroInBrowser
        );
    },
    // Creates a div for a single macro parameter.
    makeParameterDiv : function(detail, param, macroConfig) {
        var t = this, field;
        var type = param.type.name;

        // Plugin point - other JS files can define more specific field-builders based on macro name, param name and
        // type.
        if (macroConfig) {
            var builder = macroConfig.fields && macroConfig.fields[type];
            if (builder && typeof builder != "function") {
                // Types can be overridden for specific parameters - so the "type" object contains a "name" function.
                builder = builder[param.name];
            }
            if (typeof builder == "function") {
                field = builder.call(macroConfig, param);
            }
        }
        // If no override specific to the macro, look for general overrides specific to the parameter type.
        if (!field) {
            if (!(type in t.ParameterFields && typeof t.ParameterFields[type] == "function")) {
                type = "string";
            }
            field = t.ParameterFields[type](param);
        }

        t.fields[param.name] = field;
        var paramDiv = field.paramDiv;
        var input = field.input;

        var paramId = "macro-param-" + param.name;
        paramDiv.attr("id", "macro-param-div-" + param.name);
        input.addClass("macro-param-input").attr("id", paramId);

        // Use param label and desc or correct fallback.
        var pluginKey = t.metadataMap[detail.macroName].pluginKey;
        if (param.displayName == t.makeDefaultKey(pluginKey, detail.macroName, "param", param.name, "label")) {
            param.displayName = param.name;
        }
        if (param.description == t.makeDefaultKey(pluginKey, detail.macroName, "param", param.name, "desc")) {
            param.description = "";
        }

        var labelText = param.displayName;
        if (param.required) {
            labelText += " *";
            paramDiv.addClass("required");  // set class against div, not input, to allow styling of label if nec
        }
        $("label", paramDiv).attr("for", paramId).text(labelText);

        if (param.description) {
            paramDiv.append(AJS.clone("#macro-param-desc-template").html(param.description));
        }
        return paramDiv;
    },
    // Creates a div for a macro body.
    makeBodyDiv : function(body, selectedMacro) {
        var t = AJS.MacroBrowser;
        var bodyDiv = AJS.clone("#macro-body-template");

        $("textarea", bodyDiv).val((selectedMacro && selectedMacro.bodyMarkup) || t.settings.selectedMarkup || "");

        if (body.label) {
            $("label", bodyDiv).text(body.label);
        }
        if (body.description) {
            bodyDiv.append(AJS.clone("#macro-param-desc-template").html(body.description));
        }
        return bodyDiv;
    },
    // Checks and returns true if all the required macro parameters have values.
    // It disables the insert/preview buttons if false.
    processRequiredParameters: function() {
        var blankRequiredInputs = $("#macro-insert-container .macro-param-div.required .macro-param-input")
        .filter(function() {
            var val = $(this).val();
            return (val == null || val == "");
        });
        var hasAllRequiredData = (blankRequiredInputs.length == 0);
        var disabled = hasAllRequiredData ? "" : "disabled";
        var classFn = disabled ? "addClass" : "removeClass";

        AJS.$("#macro-browser-dialog button.ok").attr("disabled", disabled);
        AJS.$("#macro-browser-dialog .macro-preview-header a").attr("disabled", disabled)[classFn]("disabled");

        return hasAllRequiredData;
    },

    /**
     * Called when a parameter field value changes.
     */
    paramChanged: function () {
        // TODO - Could be used to preview?
        AJS.MacroBrowser.processRequiredParameters();
    },

    // Loads the given macro json in the browser's insert macro page.
    loadMacroInBrowser : function(data) {
        if (!data.details) {
            alert(AJS.params.unknownMacroMessage);
            return;
        }
        var t = AJS.MacroBrowser, detail = data.details;
        var macroName = detail.macroName;
        t.macroDetails[macroName] = detail;

        var summary = t.metadataMap[macroName];
        var macroTitle = summary.title;
        AJS.MacroBrowser.dialog.gotoPage(1).addHeader(data.title.replace(/\{0\}/, macroTitle));

        // Update the button label
        var okButton = AJS.$("#macro-browser-dialog .button-panel .ok");
        if (data.mode == "edit") {
            okButton.text(AJS.params.saveButtonLabel);
        } else {
            okButton.text(AJS.params.insertButtonLabel);
        }

        // Macro description and documentation link
        AJS.$("#macro-insert-container .macro-name").val(macroName);
        var macroDesc = AJS.clone("#macro-summary-template .macro-desc").prepend(summary.description),
            macroDiv = $("#macro-insert-container .macro-input-fields").html(macroDesc);
        if (detail.documentationUrl) {
            var doco = AJS.clone("#macro-doco-link-template");
            AJS.$("a", doco).attr("href", detail.documentationUrl);
            macroDesc.append(doco);
        } else if (!macroDesc.text()) { // remove the div and its padding style
            macroDesc.remove();
        }

        if (detail.body) {
            var pluginKey = t.metadataMap[macroName].pluginKey;
            if (detail.body.label == t.makeDefaultKey(pluginKey, macroName, "body", "label")) {
                detail.body.label = "";
            }
            if (detail.body.description == t.makeDefaultKey(pluginKey, macroName, "body", "desc")) {
                detail.body.description = "";
            }
            var body = t.makeBodyDiv(detail.body, t.selectedMacro);
        }

        // for macros without parameter info, we display the notation help (if any)
        if (detail.freeform) {
            var paramStr = (t.selectedMacro && t.selectedMacro.paramStr) || "",
                freeform = AJS.clone("#macro-freeform-template");
            $(".macro-name-display", freeform).text(macroName + ": ");
            $(".macro-text", freeform).val(paramStr);
            if (body) {
                body = body.append("{" + macroName + "}");
                AJS.$(".macro-freeform-input", freeform).after(body); // body goes before notation help
            }
            if (detail.notationHelp) { // notation help is in table cell markup
                var notationHelpCells = AJS.$(detail.notationHelp).children();
                if (notationHelpCells[0]) {
                    // populate input field with example macro markup, if any
                    if (!t.selectedMacro) {
                        // Take macro example HTML and replace line-breaks with newlines, dropping all other tags.
                        var example = AJS.$(notationHelpCells[0]).html().replace(/<br>/gi, "\n").replace(/<[^>]+>/gi, "");
                        var index = example.indexOf("{" + macroName);
                        if (index > -1) {
                            var macro = t.parseMacro(example.substring(index));
                            if (macro.paramStr) {
                                $(".macro-freeform-input input", freeform).val(macro.paramStr);
                            }
                            if (macro.bodyMarkup) {
                                // Remove any leading/trailing newlines and other whitespace from the body. 
                                $(".macro-body-div textarea", freeform).val(macro.bodyMarkup.replace(/^\n|\n$/g, "").replace(/^\s+|\s+$/gm, ""));
                            }
                        }
                    }
                    $(".macro-example", freeform).append(notationHelpCells[0].innerHTML).removeClass("hidden");
                }
                if (notationHelpCells[1]) {
                    $(".macro-help", freeform).append(notationHelpCells[1].innerHTML).removeClass("hidden");
                }
            }
            macroDiv.append(freeform);
        } else { // macros with parameter info
            if (body) {
                macroDiv.append(body);
            }
            var macroConfig = t.Macros[macroName];
            // Parameters may have dependencies so all fields need to be created before values are set.
            $(detail.parameters).each(function() {
                macroDiv.append(t.makeParameterDiv(detail, this, macroConfig));
            });

            var selectedParams = t.selectedMacro ? $.extend({}, t.selectedMacro.params) : {}; // make a copy

            // Fully-implemented macros may have JS overrides defined in a Macro object.
            if (macroConfig && typeof macroConfig.beforeParamsSet == "function") {
                selectedParams = macroConfig.beforeParamsSet(selectedParams, !t.selectedMacro);
            }
            $(detail.parameters).each(function() {
                var param = this,
                    value = selectedParams[param.name];

                if (value != null) {
                    delete selectedParams[param.name];
                } else {
                // try looking for aliased parameters
                    $(param.aliases).each(function() {
                        if (selectedParams[this]) {
                            value = selectedParams[this];
                            delete selectedParams[this];
                        }
                    });
                }
                if (value == null) {
                    value = param.defaultValue;
                }
                if (value != null) {
                    t.fields[param.name].setValue(value);
                }
            });

            // Any remaining "selectedParameters" are unknown for the current Macro details.
            t.unknownParams = selectedParams;
        }
        // open all links in a new window
        $("a", macroDiv).click(function() {
            window.open(this.href, '_blank').focus();
            return false;
        });

        if (!$("#macro-browser-dialog:visible").length) {
            t.dialog.show();
        }

        var firstInput = $("input:visible:first", macroDiv);
        if (firstInput.length) {
            firstInput.focus();
            if (!t.selectedMacro && firstInput.val() != "") {
                // prefilled data in new macro form - select first field for easy overwrite.
                firstInput[0].select();
            }
        }

        t.previewMacro(); // load preview with default params
    },

    makeParamStringFromMap : function(paramMap) {
        var strs = [];

        if (paramMap[""]) {
            strs.push(paramMap[""]); // no named param must be first
            delete paramMap[""]; // todo find out why this delete is here
        }

        for (var param in paramMap) {
            strs.push(param + "=" + paramMap[param]);
        }

        return strs.join("|");
    },

    // Constructs the macro markup from the insert macro page
    getMacroMarkupFromForm : function() {
        var macroName = $("#macro-insert-container .macro-name").val(),
            startTag = "{" + macroName,
            freeform = $("#macro-insert-container .macro-text"),
            params,
            t = AJS.MacroBrowser;

        if (freeform.length) {
            params = freeform.val();
        } else {
            var paramMap = {}, paramDetails = t.macroDetails[macroName].parameters;

            // Get parameter markup
            $(paramDetails).each(function() {
                var paramInput = AJS.$("#macro-param-" + this.name);
                var paramVal = paramInput.val();
                if (paramInput.attr("type") == "checkbox") {
                    paramVal = "" + paramInput.attr("checked");
                }
                if (paramVal && (!this.defaultValue || this.defaultValue != paramVal)) { // only add the parameter value if its not the default
                    paramMap[this.name] = paramVal;
                }
            });
            if (t.unknownParams) {
                $.each(t.unknownParams, function(key, value) {
                    paramMap[key] = value; // TODO - can do this better with extend? dT
                });
            }
            var macroConfig = t.Macros[macroName];
            if (macroConfig && typeof macroConfig.beforeParamsRetrieved == "function") {
                paramMap = macroConfig.beforeParamsRetrieved(paramMap);
            }

            params = t.makeParamStringFromMap(paramMap);
        }
        if (params) {
            startTag += ":" + params;
        }
        startTag += "}";

        var res = {
            name : macroName,
            startTag : startTag,
            markup : startTag,
            bodyMarkup : "",
            hasBody : AJS.$("#macro-insert-container .macro-body-div").length > 0
        };

        if (res.hasBody) {
            res.bodyMarkup = AJS.$("#macro-insert-container .macro-body-div textarea").val();
            res.markup += res.bodyMarkup + "{" + macroName + "}";
        }
        return res;
    },
    // Makes an ajax request to render the macro markup and updates the preview
    previewMacro : function() {
        var t = AJS.MacroBrowser;
        $("#macro-insert-container .macro-preview").html("");
        if (!t.processRequiredParameters()) {
            AJS.log("previewMacro: missing required params");
            return;
        }
        AJS.log("previewMacro: required params ok");
        t.showPreviewWaitImage(true);
        var wikiMarkup = t.getMacroMarkupFromForm().markup;
        var queryParams = { "contentId": (AJS.params.contentId || "0"),
                            "contentType": AJS.params.contentType,
                            "spaceKey": AJS.params.spaceKey,
                            "wikiMarkup": wikiMarkup,
                            "onloadFunction" : "top.AJS.MacroBrowser.previewOnload" };
        // Use post cause wiki markup can be quite long
        $.post(AJS.params.contextPath + "/pages/rendercontent.action", queryParams, function(html) {
            AJS.MacroBrowser.showPreviewWaitImage(false);
            // Set the iframe source to an empty JS statement to avoid secure/nonsecure warnings on https, without 
            // needing a back-end call.
            var src = AJS.params.staticResourceUrlPrefix + "/blank.html";
            AJS.$("#macro-insert-container .macro-preview").html('<iframe src="' + src + '" frameborder="0"></iframe>');
            AJS.log("previewMacro: Created iframe");
            var iframe = AJS.$("#macro-insert-container .macro-preview iframe")[0];
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.write(html);
            doc.close(); // for firefox
            var errorSpan = $("div.error span.error", doc);
            if (errorSpan.length) {
                AJS.log("Error rendering markup : " + wikiMarkup);
            }
            AJS.log("previewMacro: rendered");
        });
    },
    showPreviewWaitImage : function(flag) {
        if (flag) {
            $("#macro-browser-preview-link").attr("disabled", true).addClass("disabled");
            var throbber = AJS("div").addClass("macro-loading");
            $("#macro-browser-preview").append(throbber);
            AJS.MacroBrowser.previewSpinner = Raphael.spinner(throbber[0], 35, 60, 12, 13, "#666");
            AJS.MacroBrowser.previewSpinner.throbber = throbber;
        } else if (AJS.MacroBrowser.previewSpinner) {
            $("#macro-browser-preview").removeClass("macro-loading");
            AJS.MacroBrowser.previewSpinner();
            AJS.MacroBrowser.previewSpinner.throbber.remove();
            delete AJS.MacroBrowser.previewSpinner;
            $("#macro-browser-preview-link").attr("disabled", false).removeClass("disabled");
        }
    },
    // This gets called on the preview window's onload to re-adjust the height of the frame
    previewOnload: function(body) {
        AJS.Editor.disableFrame(body);
        // open all links in a new window
        $(body).click(function(e) {
            if (e.target.tagName.toLowerCase() === "a") {
                var a = e.target;
                var link = $(a).attr("href");
                if (link && link.indexOf("#") != 0 && link.indexOf(window.location) == -1) {
                    window.open(link, '_blank').focus();
                }
                return false;
            }
        });
    },

    /**
     * Called when the user either clicks the Macro Browser button (in Rich-text or Wiki editors) or clicks Edit in a
     * macro placeholder in the RTE.
     * @param settings macro browser settings include:
     *      selectedMacro : macro "object" as returned by getSelectedMacro
     *      selectedMarkup : string of selected markup from Wiki Markup editor when no macro selected
     *      selectedHTML : string of selected HTML from RTE when no macro selected
     *      onComplete : function to call when Macro Browser's "Insert" button is pressed
     *      onCancel : function to call when Macro Browser is closed when incomplete
     */
    open : function(settings) {
        if (!settings) {
            settings = {};
            AJS.log("No settings to open the macro browser.");
        }
        var t = AJS.MacroBrowser;
        if (t.dialog && t.dialog.ready) {
            // bind escape to close dialog
            $(document).keyup(function (e) {
                if (e.keyCode == 27)  {
                    t.cancel();
                    AJS.$(document).unbind("keyup", arguments.callee);
                    return AJS.stopEvent(e);
                }
            });

            t.settings = settings;
            t.selectedMacro = settings.selectedMacro;
            if (t.selectedMacro) {
                var macroConfig = t.Macros[t.selectedMacro.name];
                if (macroConfig && typeof macroConfig.updateSelectedMacro == "function") {
                    macroConfig.updateSelectedMacro(t.selectedMacro);
                }

                AJS.log("Open macro browser to edit macro: "+ t.selectedMacro.name);
                $("#macro-browser-dialog button.back").hide();
                this.replicateSelectMacro(t.selectedMacro.name, "edit");
            }
            else {
                $("#macro-browser-dialog button.back").show();
                this.dialog.show(); // we must show then go to panel - this order is important for IE6
                this.dialog.gotoPanel(0, 0);
                $("#macro-browser-search").val("").keyup().focus(); // clear out search box
            }
        }
        else {
            alert(AJS.params.loadingMessage);
        }
    },
    // Called when dialog is closed by Inserting/Saving.
    complete : function (dialog) {
        var t = this;
        var markup = t.getMacroMarkupFromForm();
        t.close();
        if (t.settings.onComplete) {
            t.settings.onComplete(markup);
        }
    },
    // Called when dialog is closed by various cancel buttons or via Esc key.
    cancel : function() {
        var t = this;
        t.close();
        if (typeof t.settings.onCancel == "function") {
            t.settings.onCancel();
        }
    },
    close : function() {
        var t = this;
        t.unknownParams = {};
        t.fields = {};
        t.dialog.hide();
    },
    // Replicates the user behaviour of selecting a macro and displaying the insert macro page
    replicateSelectMacro : function (macroName, mode) {
        $("#macro-browser-dialog .macro-" + macroName).click();
        this.showMacroDetails(macroName, mode);
    },
    makeDefaultKey : function() {
        return $.makeArray(arguments).join(".");
    }
};})(AJS.$);

AJS.toInit(function($) {
    // Loads the categories and macros into the dialog
    var loadBrowser = function(data) {
        if (!data.categories || !data.macros) {
            alert(AJS.params.loadBrowserErrorMessage);
            return;
        }
        var t = AJS.MacroBrowser;
        var dialog = t.dialog = new AJS.Dialog(865, 530, "macro-browser-dialog");
        dialog.addHeader(data.title);

        // sort the categories and macros
        data.categories.sort(function(one, two) {
            return (one.displayName.toLowerCase() > two.displayName.toLowerCase() ? 1 : -1);
        });
        // Clean up unset titles and descriptions before sorting
        $(data.macros).each(function() {
            if (this.title == t.makeDefaultKey(this.pluginKey, this.macroName, "label")) {
                this.title = this.macroName.charAt(0).toUpperCase() + this.macroName.substring(1).replace(/-/g, ' ');
            }
            if (this.description == t.makeDefaultKey(this.pluginKey, this.macroName, "desc")) {
                this.description = "";
            }
        });
        data.macros.sort(function(one, two) { return (one.title.toLowerCase() > two.title.toLowerCase() ? 1 : -1); });

        var makeCategoryList = function(id) {
            return $("#macro-summaries-template").clone().attr("id", "category-" + id);
        };
        var makeMacroSummary = function(macro) {
            var macroDiv = AJS.clone("#macro-summary-template")
            .click(function(e) {
                if (t.settings.nestingMacros && ($.inArray(macro.macroName, t.settings.nestingMacros) > -1)) {
                    alert(AJS.params.nestingSameMacroNotAllowedMessage);
                    return AJS.stopEvent(e);
                }
                dialog.selectedMacro = macro;
                AJS.MacroBrowser.showMacroDetails(macro.macroName);
            });

            if (macro.icon) {
                macroDiv.prepend("<img src='" + AJS.params.staticResourceUrlPrefix + macro.icon + "' alt='icon' " +
                                 "width='80' height='80' title='" + macro.title + "'/>");
            }
            $(".macro-title", macroDiv).text(macro.title);
            $(".macro-desc", macroDiv).prepend(macro.description);
            return macroDiv;
        };
        var categoryDivs = { all: makeCategoryList("all") };

        // Content on the right, setup macro list items
        $(data.macros).each(function(i, macro) {
            macro.id = "macro-" + macro.macroName;
            if (!macro.hidden) {
                var macroDiv = makeMacroSummary(macro).attr("id", macro.id);
                categoryDivs.all.append(macroDiv);
                $(macro.categories).each(function(i, catKey) {
                    categoryDivs[catKey] = categoryDivs[catKey] || makeCategoryList(catKey);
                    categoryDivs[catKey].append(makeMacroSummary(macro).attr("id", catKey + "-" + macro.id));
                });
            }
            var desc = (macro.description && macro.description.replace(/,/g, ' ')) || "";
            macro.keywords = [macro.macroName, macro.title, desc].join(',');
            t.metadataMap[macro.macroName] = macro;
        });

        // menu on the left, setup category panels
        dialog.addPanel(AJS.params.categoryAllLabel, categoryDivs["all"]);
        $(data.categories).each(function(i) {
            dialog.addPanel(this.displayName, categoryDivs[this.name] || makeCategoryList(this.name), this.name)
              .getPanel(i).setPadding(0); // remove the default dialog padding

        });
        dialog.addButton(AJS.params.cancelButtonLabel, function (dialog) { AJS.MacroBrowser.cancel(); }, "cancel");

        // prepare insert macro page
        var insertMacroBody = AJS.$("#macro-insert-template").clone().attr("id", "macro-insert-container");
        $(".macro-preview-container .macro-preview", insertMacroBody).attr("id", "macro-browser-preview");
        $(".macro-preview-container .macro-preview-header a", insertMacroBody).attr("id", "macro-browser-preview-link")
        .click(function(e) {
            AJS.MacroBrowser.previewMacro();
            return AJS.stopEvent(e);
        });

        dialog.addPage()
        .addPanel("X", insertMacroBody, "macro-input-panel")
        .addButton(AJS.params.backButtonLabel, function(dialog) {
            dialog.prevPage();
            $("#macro-browser-search").focus();
        }, "back left")
        .addButton(AJS.params.insertButtonLabel, function (dialog) { AJS.MacroBrowser.complete(); }, "ok")
        .addButton(AJS.params.cancelButtonLabel, function (dialog) { AJS.MacroBrowser.cancel(); }, "cancel")
        .getPanel(0).setPadding(0); // remove the default dialog padding

        var filterSearch = function(text) {
            var ids = null;
            if (text != '') {
                if (dialog.getCurrentPanel() != dialog.getPanel(0)) {
                    dialog.gotoPanel(0);
                }
                var options = {  splitRegex: /[\s\-]+/ };
                var filteredSummaries = AJS.filterBySearch(t.metadataMap, text, options);
                ids = {};
                $.each(filteredSummaries, function() {
                    ids[this.id] = this;
                });
            }
            $("#macro-browser-dialog .panel-body #category-all .macro-list-item").each(function() {
                (!ids || this.id in ids) ? $(this).show() : $(this).hide();
            });
        };

        // add search box
        var searchForm = $("<form id='macro-browser-search-form'><input type='text'/></form>");
        var searchInput = $("input", searchForm)
            .attr("id", "macro-browser-search")
            .keyup(function(e) {
                filterSearch($.trim(searchInput.val()));
            })
            .focus(function(e) {
                var searchInput = $(e.target);
                if (searchInput.hasClass("blank-search")) {
                    searchInput.removeClass("blank-search").val("");
                }
                e.target.select();
            })
            .blur(function (e) {
                var searchInput = $(e.target);
                if ($.trim(searchInput.val()) == "") {
                    searchInput.addClass("blank-search").val(AJS.params.blankSearchText);
                }
            })
            .blur();
        searchForm.submit(function(e) {
            var filteredMacros = $("#macro-browser-dialog .panel-body #category-all .macro-list-item:visible");
            if ($.trim(searchInput.val()) != "" && filteredMacros.length == 1) {
                // Only one macro found with search - select it.
                filteredMacros.click();
            }
            return AJS.stopEvent(e);
        });
        dialog.page[0].header.prepend(searchForm);
        dialog.page[0].ontabchange = function(newPanel, oldPanel) {
            if (newPanel != dialog.getPanel(0, 0)) {
                // Moving away from the "All" macro panel; reset the search value if present
                if (!searchInput.hasClass("blank-search")) {
                    searchInput.val('').blur();
                }
                filterSearch("");
            }
        };

        dialog.gotoPanel(0, 0);
        dialog.ready = true;
    };

    $.getJSON(AJS.params.contextPath + "/plugins/macrobrowser/browse-macros.action", loadBrowser);

})(AJS.$);
/**
 * Returns an object wrapper for a parameter-div jQuery object and the input in that div that stores the internal
 * parameter value (as opposed to the display field, although they may be the same).
 */
AJS.MacroBrowser.Field = function (paramDiv, input, options) {
    options = options || {};

    var setValue = options.setValue || function (value) {
        input.val(value);
    };

    input.change(options.onchange || AJS.MacroBrowser.paramChanged);

    return {
        paramDiv : paramDiv,
        input : input,
        setValue : setValue
    };
};

/**
 * ParameterFields defines default "type" logic for fields in the Macro Browser's Insert/Edit Macro form.
 *
 * Each method in this object corresponds to a parameter type as defined in the MacroParameterType enum.
 */
AJS.MacroBrowser.ParameterFields = (function ($) { return {

    /**
     * Default field for all unknown types.
     */
    "string" : function (param, options) {

        var paramDiv = AJS.clone("#macro-param-template");
        var input = $("input", paramDiv);

        if (param.required) {
            input.keyup(AJS.MacroBrowser.processRequiredParameters);
        }
        
        return AJS.MacroBrowser.Field(paramDiv, input, options);
    },

    /**
     * A checkbox - assumes not true means false, not null.
     */
    "boolean" : function (param, options) {

        var paramDiv = AJS.clone("#macro-param-checkbox-template");
        var input = $("input", paramDiv);

        options = options || {};
        options.setValue = options.setValue || function (value) {
            if (/true/i.test(value) ||
                (/true/i.test(param.defaultValue) && !(/false/i).test(value))) {
                input.attr("checked", "checked");
            }
        };

        return AJS.MacroBrowser.Field(paramDiv, input, options);
    },

    "enum" : function (param, options) {
        if (param.multiple) {
            return AJS.MacroBrowser.ParameterFields["string"](param, options);
        }

        var paramDiv = AJS.clone("#macro-param-select-template");
        var input = $("select", paramDiv);
        if (!(param.required || param.defaultValue)) {
            input.append("<option value=''> </option>");
        }
        $(param.enumValues).each(function() {
            input.append("<option value='" + this + "'>" + this + "</option>");
        });

        return AJS.MacroBrowser.Field(paramDiv, input, options);
    }
    
}; })(AJS.$);

AJS.MacroBrowser.Macros = {};