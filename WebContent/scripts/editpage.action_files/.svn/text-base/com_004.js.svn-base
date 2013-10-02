tinymce.confluence.formatter = new (function ($) {
    /**
     * This structure describes how to create a new instance of a block format.
     * rawText: if true, extract the raw text from the macro body and throw any formatting away.
     */
    var formatDescriptors = {
        p: {
            rawText: false},
        macro_quote: {
            macroName: "quote",
            rawText: false },
        macro_panel: {
            macroName: "panel",
            rawText: false },
        macro_noformat: {
            macroName: "noformat",
            rawText: true },
        macro_code: {
            macroName: "code",
            rawText: true }
    };

    // Public (privileged) methods here - called from tiny_mce_src.js
    this.formatBlock = function(format) {
        var ed = tinyMCE.activeEditor,
            selection = ed.selection,
            outerBlock = getEnclosingBlock(selection.getNode()),
            bookmark = selection.getBookmark(); // get the bookmark before we do any formatting

        if (!format) {
            removeFormat(outerBlock, ed.dom);
        }
        else if (!outerBlock) { 
            formatRange(ed, format);
        }
        else {
            formatElement(ed, format, outerBlock);
        }

        // clean up code
        selection.moveToBookmark(bookmark);
        ed.nodeChanged();

        // only execute the FormatBlock command for known formatting
        if(/^(P)$/i.test(format)) {
            ed.getDoc().execCommand('FormatBlock', false, format);
        }
    };

    // Private members - variables and functions.
    function formatElement(editor, format, outerBlock) {
        AJS.log("formatElement");

        var $blockToFormat = $(outerBlock),
            macroBody = $blockToFormat.html(),
            formatDescriptor = formatDescriptors[format];

        if (formatDescriptor.rawText) {
            macroBody = $blockToFormat.text();
        }

        // if we are already in a formatting macro, we need to
        // remove the formatting before applying the new one
        var macro = getEnclosingMacro($blockToFormat);
        if (macro.length && getFormatDescriptor(macro)) {
            var s = editor.selection, b = s.getBookmark();
            removeFormat(macro[0], editor.dom, macro);
            s.moveToBookmark(b);
            insertMacro(formatDescriptor, macroBody, s.getNode());
        }
        else {
            insertMacro(formatDescriptor, macroBody, $blockToFormat[0]);
        }
    };

    function formatRange(editor, format) {
        AJS.log("formatRange");
        var range = ed.selection.getRng(), formatDescriptor = formatDescriptors[format];
        var macroBody;
        if (formatDescriptor.rawText) {
            macroBody = range.text || editor.selection.getContent({format : 'text'});
        }
        else {
            macroBody = range.htmlText || editor.selection.getContent();
        }
        insertMacro(formatDescriptor, macroBody);
    };

    function getBodySelector(formatDescriptor) {
        return formatDescriptor.rawText ? "pre" : "p";
    };

    function insertMacro(formatDescriptor, macroBody, node) {
        macroBody = macroBody || " ";
        var macroName = formatDescriptor.macroName,
            markup = "\n{" + macroName + "}\ntext\n{" + macroName + "}\n"; // newlines and 'text' is required

        WysiwygConverter.convertWikiMarkupToXHtmlWithoutPageWithSpaceKey(markup, AJS.Editor.getContentId(), AJS.params.spaceKey,
            function(macroHtml) {
                var editor = tinyMCE.activeEditor, s = editor.selection;
                if (node) {
                    s.select(node);
                }
                var $macro = $("<div>" + macroHtml + "</div>"),
                    toInsert = $macro.find("div.wysiwyg-macro " + getBodySelector(formatDescriptor));
                if (toInsert.length == 1) {
                    toInsert.html(macroBody);
                }
                else {
                    AJS.log("Error: cannot find macro body");
                }

                tinymce.confluence.macrobrowser.processMacros($macro);
                s.setContent($macro.html());
            });
    };

    /**
     * Returns a html element that is an 'enclosing block' of the given node. An enclosing block in this context
     * refers to a format block described in formatDescriptors.
     */
    function getEnclosingBlock (node) {

        if (/^(P|DIV|H[1-6]|PRE)$/i.test(node.nodeName)) {
            return node;
        }
        // otherwise we try and find the first ancestor that is a block element
        var enclosingElem = null;
        $(node).parents().each(function(i, parent) {
            if (/^(P|DIV|H[1-6]|PRE)$/i.test(parent.nodeName)) {
                enclosingElem = parent;
                return false;
            }
        });
        return enclosingElem;
    };

    function getEnclosingMacro($node) {
        return $node.hasClass("wysiwyg-macro") ? $node : $node.parents("div.wysiwyg-macro:first");
    };

    function getFormatDescriptor($node) {
        var macroName = $node.attr("macroname");
        return formatDescriptors["macro_" + macroName];
    };

    function removeFormat(enclosingBlock, domUtils, enclosingMacro) {
        AJS.log("removeFormat");
        // Can't remove format from range - doesn't make sense.
        if (!enclosingBlock) {
            AJS.log("removeFormat: enclosingBlock null, returning");
            return;
        }
        var content, $enclosingBlock = $(enclosingBlock);
        // look for an enclosing macro first
        enclosingMacro = enclosingMacro || getEnclosingMacro($enclosingBlock);
        if (enclosingMacro.length) {
            var descriptor = getFormatDescriptor(enclosingMacro);
            if (descriptor) {
                AJS.log("Remove macro format: " + descriptor.macroName);
                $enclosingBlock = enclosingMacro;
                content = enclosingMacro.find(getBodySelector(descriptor));
                if (descriptor.rawText) {
                    content = content.text();
                }
            }
        }
        if (!content) {
            content = enclosingBlock.childNodes;
        }

        if ($enclosingBlock.parent("body").length) {
            // Text in the editor should never be directly inside the body - should at least
            // be in a p. This is how the wiki-renderer does it too.
            var p =  domUtils.create("p");
            $(p).append(content);
            $enclosingBlock.replaceWith(p);
        }
        else {
            $enclosingBlock.replaceWith(content);
        }
    };
})(AJS.$);
function PageItem(name) {
    this.commandName = name
}

// this method is passed the event
PageItem.prototype.OnClick = function(e) {
    var target;

    //alert(DWRUtil.toDescriptiveString(e,2,1));
    if (!e.target) {
        // IE event model
        target = e.srcElement;
    }
    else {
        target = e.target;
    }
    this.selectNode(target);
}


// this method is passed the tag which has been clicked on
PageItem.prototype.OnDoubleClick = function( e ) {
    this.selectNode(e);
}

PageItem.prototype.findTarget = function(t) {
    if (t == null)
        return null;

    if (this.isOurNode(t))
        return t;

    return this.findTarget(t.parentNode);
}

PageItem.prototype.selectNode = function(target) {
    var a = this.findTarget(target);
    if (a) {
        this.SelectedNode = a;
    }
    else {
        this.SelectedNode = undefined;
    }
    return this.SelectedNode;
}

ConfLink.prototype = new PageItem("ConfLink");

function ConfLink() { }

// Add a new element at the actual selection.
ConfLink.prototype.Add = function(link, show, destination, alias, tooltip, pageId, spaceKey ) {

    var oSpan = tinyMCE.activeEditor.dom.create('A');
    this.SetupSpan(oSpan, link, show, destination, alias, tooltip, pageId, spaceKey);
    var range = tinyMCE.activeEditor.selection.getRng()

    if (tinymce.isIE) {
        range.pasteHTML(oSpan.outerHTML);
    }
    else {
        range.insertNode(oSpan);
    }
}

var replySpan;

ConfLink.prototype.reply_setupspan = function(html) {
    if (html.indexOf('<p>') == 0) {
        html = html.substring(3);
    }
    if (html.lastIndexOf('</p>') == html.length - 4) {
        html = html.substring(0,html.length - 4);
    }
    // So that we do not need to always pad links with a thinsp or something,
    // pad it here with a regular space.  Not ideal at all.
    html += ' ';

    // setOuterHTML
    if (tinymce.isIE) {
        replySpan.outerHTML = html; // todo check why this doesn't work
    }
    else {
        //alert(DWRUtil.toDescriptiveString(replySpan));
       var r = replySpan.ownerDocument.createRange();
       r.setStartBefore(replySpan);
       var df = r.createContextualFragment(html);
       replySpan.parentNode.replaceChild(df, replySpan);
    }
}

// decode HTML encoded text
ConfLink.prototype.DecodeURI = function(encoded) {
    return encoded;
}

// decode HTML encoded text
ConfLink.prototype.EncodeURI = function(unencoded) {
    return unencoded;
}

ConfLink.prototype.SetupSpan = function(span, link, show, destination, alias, tooltip, pageId, spaceKey) {

    replySpan = span;
    replySpan.innerHTML = show;
    span.setAttribute('href','#');
    span.setAttribute('linktype','raw');
    span.setAttribute('wikidestination', destination);
    if (alias.length > 0) {
        span.setAttribute('aliasspecified', 'true');
    }
    else {
        span.setAttribute('originalalias', destination);
    }
    if (tooltip.length > 0) {
	    span.setAttribute('title', tooltip);
	    span.setAttribute('wikititle', tooltip);
	}
    if (pageId) {
        DWREngine.setPostHook(this.DWRComplete);
        dwrInProgress = true;
        WysiwygConverter.convertWikiMarkupToXHtmlWithoutPageWithSpaceKey('[' + link + ']', pageId, spaceKey, this.reply_setupspan);
    }
}

ConfLink.prototype.DWRComplete = function() {
    dwrInProgress = false;
}

ConfLink.prototype.isOurNode = function(t) {
    return t.tagName == 'A' && t.getAttribute('linktype') == "raw";
}

var  textField;

function reply_loadselected(markup) {
    textField.value = markup;
}

ConfLink.prototype.LoadMarkup = function(xhtml, field, pageId) {
    textField = field;
    if (pageId) {
        WysiwygConverter.convertXHtmlToWikiMarkupWithoutPage(xhtml, pageId, reply_loadselected);
    }
}

ConfLink.prototype.Ok = function(destinationStr, aliasStr, tooltipStr, linkTextWikiMarkup, selection, pageId, spaceKey) {

    var ed = tinyMCE.activeEditor;
    if ( destinationStr.length == 0 ) {
		alert(ed.getLang("confluence.conflink_error_no_name"));
		return false;
	}

    // http://jira.atlassian.com/browse/CONF-13342
    if (tooltipStr.length > 0 && aliasStr.length == 0) {
        aliasStr = destinationStr;
    }
    var showtext = (aliasStr.length > 0 ? aliasStr : destinationStr);

    var eSelected = selection.getNode();
    if (eSelected && !this.isOurNode(eSelected)) {
        // we had a selection, but it wasn't an existing link
        // so delete the existing contents then add
        var rng = ed.selection.getRng();
        if (rng.deleteContents) rng.deleteContents();
        eSelected = null;
    }

    if (eSelected) {
        this.SetupSpan(eSelected, this.EncodeURI(linkTextWikiMarkup), showtext, destinationStr, aliasStr, tooltipStr, pageId, spaceKey);
    }
    else {
        this.Add(this.EncodeURI(linkTextWikiMarkup), showtext, destinationStr, aliasStr, tooltipStr, pageId, spaceKey);
	}
};

ConfImage.prototype = new PageItem("ConfImage");

function ConfImage() {
    window.ConfImage = this;
}

ConfImage.prototype.Add = function( name, imagetext, pageNumber ) {
    // Regardless of how the image is being aligned, wrap it in a div, so the image has a parent node
    var div = tinyMCE.activeEditor.dom.create('DIV');
    var oImg = tinyMCE.activeEditor.dom.create('IMG');
    div.appendChild(oImg);

    this.SetupImg(oImg, name, imagetext, pageNumber) ;

    // Insert the div into the current range
    var range = tinyMCE.activeEditor.selection.getRng();
    if (tinymce.isIE) {
        range.pasteHTML(div.outerHTML);
    }
    else {
        range.insertNode(div);
    }
}

ConfImage.prototype.SetupImg = function(img, filename, imagetext, pageNumber) {

    var location, src;

    if (this.imageProperties['thumbnail']) {
        location = 'thumbnails';
    }
    else {
        location = 'attachments';
    }

    // check whether this is a remote image
    if (filename.indexOf("http://") != 0 && filename.indexOf("https://") != 0) {
        src = tinyMCE.settings.context_path + '/download/' + location + '/' + pageNumber + '/' + filename
    }
    else {
        src = filename;
    }

    img.setAttribute("imagetext", imagetext);
    img.setAttribute("src", src);

    if (this.imageProperties['align']) {
        img.setAttribute('align', this.imageProperties['align']);
    }
    else {
        img.removeAttribute('align');
    }
    this.adjustParent(this.imageProperties['align'], img);

    img.removeAttribute('width');
    img.removeAttribute('height');
}

ConfImage.prototype.adjustParent = function(alignment, imgTag) {
    // If the image is centered...
    if (alignment && alignment == 'center')
    {
        // If the image is not centered already...
        if (!this.isCentered(imgTag))
        {
            // Set the alignment in the parent node
            var parent = imgTag.parentNode;
            parent.setAttribute('align', 'center');
        }
    }
    else
    {
        // If the image is currently centered, but should not be...
        if (this.isCentered(imgTag))
        {
            // Remove the align attribute
            var div = imgTag.parentNode;
            div.removeAttribute('align');
        }
    }
 }

 ConfImage.prototype.isCentered = function (imgTag) {
     if (imgTag.parentNode == undefined)
        return false;

     if (imgTag.parentNode.tagName == undefined)
         return false;

     if (imgTag.parentNode.tagName != 'DIV')
         return false;

     return imgTag.parentNode.getAttribute('align') == 'center';
 }

ConfImage.prototype.isOurNode = function (t) {
    return t.tagName == 'IMG' && t.getAttribute('imagetext');
}

ConfImage.prototype.Ok = function (fileName, thumbnail, alignment, tag, pageId) {

    this.imageProperties = {};
    this.imageProperties['fileName'] = fileName;
    this.imageProperties['thumbnail'] = thumbnail;
    if (alignment != '')
        this.imageProperties['align'] = alignment;

    if (tag && tag.getAttribute('width'))
            this.imageProperties['width'] = tag.getAttribute('width');

    if (tag && tag.getAttribute('height'))
            this.imageProperties['height'] = tag.getAttribute('height');

    var imagetext = this.createImageTextFromProperties();
    if (tag)
    {
        this.SetupImg(tag, fileName, imagetext, pageId );
    }
    else
    {
        this.Add(fileName, imagetext, pageId);
	}
}

ConfImage.prototype.createImageTextFromProperties = function () {

    var imagetext = this.imageProperties['fileName'];
    var sep = '|';
    for (var i in this.imageProperties)
    {
        if (i != 'fileName')
        {
            var value = null;
            if (this.imageProperties[i] != null)
            {
                if (this.imageProperties[i] === true)
                {
                    value = i;
                }
                else if (this.imageProperties[i] !== false)
                {
                    value = i + '=' + this.imageProperties[i];
                }
                if (value)
                {
                    imagetext = imagetext + sep + value;
                    sep = ','
                }
            }
        }
    }
    return imagetext;
}
String.prototype.trim = function()
{
	return this.replace( /(^\s*)|(\s*$)/g, '' ) ;
}

tinyMCE.confLink = new ConfLink();
tinyMCE.confImage = new ConfImage();

// todo - refactor up to here

(function() {

    // common parameters for both insert link and image
    function getUrlQueryParams() {
        if (tinyMCE.settings.page_id)
            return 'pageId=' + tinyMCE.settings.page_id + '&currentspace=' + tinyMCE.settings.space_key + '&formname=' + tinyMCE.settings.form_name;

        return 'draftType=' + tinyMCE.settings.draft_type + '&spaceKey=' + tinyMCE.settings.space_key + '&currentspace=' + tinyMCE.settings.space_key + '&formname=' + tinyMCE.settings.form_name;
    }

    // pass information regarding the currently selected link (or text) to the insert link popup via request parameters
    function getLinkUrlQueryParams() {
        var selection = tinyMCE.activeEditor.selection;
        var selectedElement = selection.getNode();

        // link text is the wiki markup form of the link
        if (selectedElement && tinyMCE.confLink.isOurNode(selectedElement)) {
            var alias = AJS.$(selectedElement).text();
            var destination = selectedElement.getAttribute("wikidestination");
            var tooltip = selectedElement.getAttribute("wikititle");
            return "alias=" + alias + "&destination=" + destination + (tooltip ? "&tooltip=" + tooltip : "");
        }

        var range = selection.getRng();
        if(range.text)
            return "alias=" + range.text;

        if(selection.getSel() && selection.getSel().toString)
            return "alias=" + selection.getSel().toString();

        return "";
    }

    tinymce.create('tinymce.plugins.ConfluencePlugin', {
		init : function(ed, url) {
            var urlQueryParams = getUrlQueryParams();
            var confLinkActionName = (tinyMCE.settings.page_id ? 'wysiwyg-insertlink-page' : 'wysiwyg-insertlink-draft');

            // Register commands
			ed.addCommand('mceConflink', function() {
                try {
                    AJS.Editor.LinkPopup = {}; // clears previous data
                } catch(error) {
                    AJS.log(error);
                }
                ed.windowManager.open({
                    name: "link_image_inserter",
                    file : tinyMCE.settings.plugin_action_base_path + '/' + confLinkActionName + '.action?' + urlQueryParams + "&" + getLinkUrlQueryParams(),
					width : tinyMCE.settings.confluence_popup_width,
					height : tinyMCE.settings.confluence_popup_height,
					inline : 1,
                    resizable : 1,
                    scrollbars : 1,
                    location : 0 //todo this doesn't work for ie and ff3
				}, {
                    // pass custom params to dialogs here
				});
			});

            ed.addCommand("mceConfimage", function() {

                var actionName = (tinyMCE.settings.page_id ? "wysiwyg-insertimage-page" : "wysiwyg-insertimage-draft");

                ed.windowManager.open({
                    name: "link_image_inserter",
					file : tinyMCE.settings.plugin_action_base_path + "/" + actionName + ".action?" + urlQueryParams,
					width : tinyMCE.settings.confluence_popup_width,
					height : tinyMCE.settings.confluence_popup_height,
					inline : 1,
                    resizable : 1,
                    scrollbars : 1,
                    location : "no" //todo this doesn't work for ie and ff3
                }, {
                    // pass custom params to dialogs here
				});
			});

            ed.addCommand("mceConfMacroBrowser", tinymce.confluence.macrobrowser.macroBrowserToolbarButtonClicked);

            ed.addCommand("mceConfUnlink", function() {
                var s = ed.selection, n = s.getNode();
                if (!AJS.$(n).hasClass("external-link")) {
                    ed.execCommand("UnLink");
                }
                else { // unlinking external links requires wrapping in the nolink macro
                    s.select(n);
                    WysiwygConverter.convertWikiMarkupToXHtmlWithoutPageWithSpaceKey(
                        "{nolink:" + AJS.$(n).text() + "}", AJS.Editor.getContentId(), AJS.params.spaceKey,
                        function(macroHtml) {
                            s.setContent(macroHtml);
                            s.collapse(false);
                        });
                }
            });

            // Register buttons
			ed.addButton("conflink", {title : "confluence.conflink_desc", cmd : "mceConflink"});
			ed.addButton("confimage", {title : "confluence.confimage_desc", cmd : "mceConfimage"});
			ed.addButton("conf_macro_browser", {title : "confluence.conf_macro_browser_desc", cmd : "mceConfMacroBrowser"});

            ed.addShortcut("ctrl+k", ed.getLang("confluence.conflink_desc"), "mceConflink");
            ed.addShortcut("ctrl+m", ed.getLang("confluence.confimage_desc"), "mceConfimage");
        },

		getInfo : function() {
			return {
				longname : "Confluence",
				author : "Atlassian",
				authorurl : "http://www.atlassian.com",
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add("confluence", tinymce.plugins.ConfluencePlugin);
})();
tinymce.confluence.macrobrowser = (function($) { return {
    /**
     * The current selection range in the editor
     */
    storedRange : null,
    /**
     * The current bookmark location in the editor
     */
    bookmark : null,

    getCurrentNode : function () {
        return $(tinyMCE.activeEditor.selection.getNode());
    },
    isMacroDiv : function(node) {
        return $(node).hasClass("wysiwyg-macro");
    },
    isMacroTag : function(node) {
        return $(node).hasClass("wysiwyg-macro-tag");
    },
    isMacroStartTag : function(node) {
        return $(node).hasClass("wysiwyg-macro-starttag");
    },
    isMacroEndTag : function(node) {
        return $(node).hasClass("wysiwyg-macro-endtag");
    },
    isMacroBody : function(node) {
        return $(node).hasClass("wysiwyg-macro-body");
    },
    hasMacroBody : function(node) {
        return $(node).attr("macrohasbody") == "true";
    },
    /**
     * Returns an array of macro names for macro divs enclosing the current node.
     */
    getNestingMacros : function(node) {
        var $node = $(node || this.getCurrentNode());
        var nestingMacros = [];
        $node.parents(".wysiwyg-macro").each(function() {
            nestingMacros.push($(this).attr("macroname"));
        });
        return nestingMacros;
    },
    processMacros : function(node) {
        var domUtils = tinyMCE.activeEditor.dom;
        // wrap macro body elments in a p if none exists
        $(".wysiwyg-macro-body", node).each(function() {
            var macroBody = this;
            if (!macroBody.firstChild || macroBody.firstChild.nodeName.toLowerCase() != "p") {
                var p = domUtils.create("p");
                while (macroBody.firstChild) {
                    p.appendChild(macroBody.firstChild);
                }
                domUtils.add(macroBody, p);
            }
        });
    },
    flushRedundantPadding : function () {
        var domUtils = tinyMCE.activeEditor.dom;
        // remove unnecessary p's added by Confluence's renderer
        $("p.atl_conf_pad", tinyMCE.activeEditor.getDoc()).each(function() {
            if ($(this).next().length) {
                AJS.log("onSetContent: removing p.atl_conf_pad");
                domUtils.remove(this);
            }
        });
    },

    handleKeyPressInMacroTag : function (isReturn, code, selectionNode) {
        var t = tinymce.confluence.macrobrowser, domUtils = tinyMCE.activeEditor.dom;
        var s = tinyMCE.activeEditor.selection;

        var pContent = isReturn ? "&nbsp;" : String.fromCharCode(code);
        var macroDiv = selectionNode.parentNode;
        var hasMacroBody = t.hasMacroBody(macroDiv);
        var bodyDiv = hasMacroBody ? $(".wysiwyg-macro-body:first", macroDiv)[0] : null;

        var rng = AJS.Editor.Adapter.getRange();
        var cursorLocation = rng.startOffset;
        var atStartOfMacroTag = cursorLocation == 0;
        var p;
        if (atStartOfMacroTag) {
            // Cursor is at start of either the start or end tag (if present)
            p = domUtils.create("p", {}, pContent);
            if (t.isMacroStartTag(selectionNode)) {
                // typing at start of starting tag - insert para before macro div.
                var parent = macroDiv.parentNode;
                parent.insertBefore(p, macroDiv);
            } else {
                // at start of end tag, add text to body
                bodyDiv.appendChild(p);
            }
        } else {
            // Cursor is either inside the tag or at the end.
            var needsP = isReturn || t.isMacroEndTag(selectionNode);
            if (!needsP) {
                var macroTagText = $(selectionNode).text();
                // Assumes that div text is a single node and the cursor is at the end of the text (after the '}')
                needsP = cursorLocation == macroTagText.length;
            }
            if (!needsP) {
                // Typing inside the start tag - allow.
                return true;
            }

            p = domUtils.create("p", {}, pContent);
            if (hasMacroBody && t.isMacroStartTag(selectionNode)) {
                // insert enter/char at start of body, inside body div
                bodyDiv.insertBefore(p, bodyDiv.firstChild);
            } else {
                // put after the entire macro
                domUtils.insertAfter(p, macroDiv);
            }
        }
        s.select(p, true);  // select the textnode in the p rather than the p itself
        s.collapse(isReturn); // collapse to end (after the new character) or start (before nbsp)

        return false;
    },

    onTinyMceInitialised : function(editor) {
        var t = tinymce.confluence.macrobrowser;

        editor.onSetContent.add(function(editor) {
            AJS.log("onSetContent: process macros and remove uncessary p's");
            t.processMacros(editor.getDoc());
            t.flushRedundantPadding();
        });

        // override enter key press on macro tags so it adds a 'p' instead of a 'div'
        editor.onKeyPress.addToTop(function(editor, e) {

            // Ignore key combinations.
            if (e.ctrlKey || e.metaKey || e.altKey) return true;

            // Ignore arrows, tabs, etc. TODO - find displayable chars better.
            var code = e.charCode || e.keyCode;
            var isPrintableChar = false;  // (code >= 32 && code <= 126);
            var isReturn = (code == 13 && !e.shiftKey);
            if (!isReturn && !isPrintableChar) {
                return true;
            }

            // Ignore anything outside a macro tag.
            var s = editor.selection, selectionNode = s.getNode();
            if (!t.isMacroTag(selectionNode)) {
                return true;
            }

            var returnVal = t.handleKeyPressInMacroTag(isReturn, code, selectionNode);
            if (!returnVal)
                tinymce.dom.Event.cancel(e);

            return returnVal;
        });
    },

    logMCESelection : function (title) {
        var s = tinyMCE.activeEditor.selection;
        AJS.log("******************************");
        AJS.log("Logging TinyMCE selection title:    " + title);
        AJS.log("Bookmark:");
        AJS.log(s.getBookmark());
        var rangeNodeText = $(s.getRng().startContainer).text() || $(s.getRng().startContainer.parentNode).text();
        AJS.log("Range: " + rangeNodeText);
        AJS.log(s.getRng());
    },

    getSelectedMacro : function(editor) {
        var t = tinymce.confluence.macrobrowser,
            $selectionNode = t.getCurrentNode();
        AJS.log("getSelectedMacro: $selectionNode=" + $selectionNode[0]);
        // when we upgrade to jquery 1.3 use closest() instead of parents()
        return t.isMacroDiv($selectionNode) ? $selectionNode : $selectionNode.parents(".wysiwyg-macro:first");
    },

    openWithMacroMarkup : function(macroMarkup) {
        AJS.MacroBrowser.open({
            selectedMacro : AJS.MacroBrowser.parseMacro(macroMarkup),
            onComplete : tinymce.confluence.macrobrowser.macroBrowserComplete,
            onCancel : tinymce.confluence.macrobrowser.macroBrowserCancel
        });
    },

    /**
     * Stores the currently selection node and point in the editor so we can get back to to it later
     */
    storeCurrentSelectionState : function() {
        var t = tinymce.confluence.macrobrowser,
            selection = tinyMCE.activeEditor.selection,
            vp = tinyMCE.activeEditor.dom.getViewPort(tinyMCE.activeEditor.getWin());

        // Make a copy of the range in case the original is altered by the Macro Browser (e.g. to select the
        //  entire macro tag around the caret)
        var rng = selection.getRng();
        if (rng.cloneRange && typeof rng.cloneRange == "function")
            var rngCopy = rng.cloneRange();
        else
            var rngCopy = rng.duplicate(); // IE

        t.bookmark = {
            scrollX : vp.x,
            scrollY : vp.y,
            range : rngCopy
        };
    },

    /**
     * Moves the seleciton point in the editor back to where it used to be.
     */
    restoreSelectionState : function() {
        var t = tinymce.confluence.macrobrowser,
            selection = tinyMCE.activeEditor.selection,
            win = tinyMCE.activeEditor.getWin();

        win.scrollTo(t.bookmark.scrollX, t.bookmark.scrollY);
        win.focus();
        selection.setRng(t.bookmark.range);        
    },

    /**
     * Called to insert a new macro.
     * If user has not selected text, just open the Macro Browser.
     * If user has selected text, it will convert it to wiki markup for the body of the macro
     */
    macroBrowserToolbarButtonClicked : function() {
        var t = tinymce.confluence.macrobrowser,
            editor = tinyMCE.activeEditor,
            node = t.getCurrentNode();

        t.storeCurrentSelectionState();

        // Editing an existing macro
        if (t.isMacroTag(node)) {
            var macroDiv = node.parent()[0];
            editor.selection.select(macroDiv);      // select the entire macro for the user to see
            t.editedMacroDiv = macroDiv;
            var macroHtml = tinymce.DOM.getOuterHTML(macroDiv);
            WysiwygConverter.convertXHtmlToWikiMarkupWithoutPage(macroHtml, AJS.Editor.getContentId(), function(markup) {
                t.openWithMacroMarkup(markup);
            });
            return;
        }
        // Inserting new macro
        var settings = {
            nestingMacros : t.getNestingMacros(node),
            onComplete : t.macroBrowserComplete,
            onCancel : t.macroBrowserCancel
        };
        var selectedHtml = editor.selection.getContent();
        if (!selectedHtml) { // no selected text
            AJS.MacroBrowser.open(settings);
            return;
        }

        // selected text for the macro body
        WysiwygConverter.convertXHtmlToWikiMarkupWithoutPage(selectedHtml, AJS.Editor.getContentId(), function(markup) {
            settings.selectedMarkup = markup;
            settings.selectedHtml = selectedHtml;
            AJS.MacroBrowser.open(settings);
        });
    },
    /**
     * Takes macro markup (usually generated by the Macro Browser) and inserts/updates the relevant Macro macroHeader
     * in the RTE.
     * @param macro macro object describing inserted/edited macro
     */
    macroBrowserComplete : function(macro) {
        var t = tinymce.confluence.macrobrowser;
        var contentId = AJS.params.contentId || "0";
        WysiwygConverter.convertWikiMarkupToXHtmlWithoutPageWithSpaceKey(macro.markup, contentId, AJS.params.spaceKey,
            function(macroHtml) {
                var editor = tinyMCE.activeEditor;
                var macro = editor.dom.create("div", {}, macroHtml);
                t.processMacros(macro);
                
                // The converter call above doesn't know if it should have lines before/after so add both because it's
                // better than losing both.
                $(".wysiwyg-macro", macro).attr("wikihasprecedingnewline", "true").attr("wikihastrailingnewline", "true");
                macroHtml = $(macro).html();

                t.restoreSelectionState();  // restores to original caret or range user was at
                if (t.editedMacroDiv) {
                    editor.selection.select(t.editedMacroDiv); // select the entire macro so we can replace it
                    t.editedMacroDiv = null;
                }
                editor.selection.setContent(macroHtml);
                t.flushRedundantPadding();
            }
        );
    },
    // Called when the macro browser is closed to clean up and reset data.
    macroBrowserCancel : function() {
        var t = tinymce.confluence.macrobrowser;
        t.restoreSelectionState();
        t.editedMacroDiv = null;
    }
};})(AJS.$);
/**
 * Implement the methods required by the com.atlassian.confluence.plugin.editor.Editor interface, adapting to a
 * TinyMCE editor implementation.
 *
 * Note that tinyMCE should not be used as it gets confused with the tinymce object. Use tinymce.EditorManager if that's
 * what you need.
 */
AJS.Editor.Adapter = (function($) { return {

    /**
     * Public interface methods on Editor.java
     */

    // called just after the DIV containing the editor is made visible
    onShowEditor : function () { },

    // called just before the DIV containing the editor is hidden
    onHideEditor : function () { },

    // put the text in newValue into the editor. This is called when the editor needs new
    // content -- it is *not* called to set the initial content. That should be done either by providing the
    // editor with the content as part of the initial HTML, or by calling javascript from editorOnLoad()
    setEditorValue : function (newValue) {
        if (newValue) {
            this.getEditor().setContent(newValue);
        }
    },

    /*
     *  If TinyMCE has not finished loading the page content, and the user switches tabs (from rich text to markup),
     *  block the switch, otherwise their content will be lost. (CONF-4824)
     */
    // return true if the editor is in a state where changes from rich text to markup and vice versa are allowed
    allowModeChange : function () {
        return this._tinyMceHasInit;
    },
    // called when editor mode is changed from wysiwyg to another e.g. markup
    onChangeMode : function() {},

    // return the current HTML contents of the editor. This *must* return a JavaScript string,
    // not a JavaObject wrapping a java.lang.String
    getEditorHTML : function () {
        return "" + this.getEditor().getContent();
    },

    // called in the page's onLoad handler, place any initialization needed at this point here
    editorOnLoad : function () { },

    // return true if the contents of the editor has been modified by the user since
    // the last time editorResetContentChanged()
    editorHasContentChanged : function () {
        return this.getEditor().isDirty();
    },

    // called to reset the contents change indicator
    editorResetContentChanged : function () {
        this.getEditor().setDirty(false);
    },

    /**
     * Non interface methods & variables
     */
    _tinyMceHasInit : false,

    getTinyMceHasInit: function () {
        return this._tinyMceHasInit;
    },

    getEditor : function () {
        return tinyMCE.activeEditor;
    },

    tinyMceOnInit : function() {
        AJS.log("Adapter:tinyMceOnInit oninit callback");
        this._tinyMceHasInit = true;

        if (this.onInitCallback) {
            this.onInitCallback();
        }

        // Initial IE range -> W3C DOM Range handler
        this.IERange && this.IERange.setupSelection(this.getEditor().getDoc());
    },

    /**
     * Returns the current range in DOM-style for any browser.
     */
    getRange : function () {
        if (this.IERange)
            return this.IERange.getSelection().getRangeAt(0);

        return tinyMCE.activeEditor.selection.getRng();
    },

    /**
     * Returns a new DOM-style range for any browser.
     */
    createRange : function () {
        var doc = tinyMCE.activeEditor.getDoc();

        if (this.IERange && this.IERange.createRange)
            return this.IERange.createRange(doc);
        
        return doc.createRange();
    },

    tinyMceEventHandler : function(e) {
        // handle tabbing in tables and lists
        if (e.keyCode == 9) {
            var ed = this.getEditor();
            var selectionNode = ed.selection.getNode();
            var inTable = ed.dom.getParent(selectionNode, 'TABLE');
            var inList = ed.dom.getParent(selectionNode, 'UL') || ed.dom.getParent(selectionNode, 'OL');

            if (inList || inTable) {
                // stop firefox's default tab behaviour
                if (tinymce.isGecko && e.type == "keypress") {
                    return AJS.stopEvent(e);
                }

                // lists have precedence over tables
                if (e.type == "keydown") {
                    var command;
                    if (inList) {
                        command = e.shiftKey ? "Outdent" : "Indent";
                    }
                    else {    // inTable
                        command = e.shiftKey ? "mceTableMoveToPrevRow" : "mceTableMoveToNextRow";
                    }
                    ed.execCommand(command);
                    return false;
                }
            }
        }

        return true; // otherwise continue with default handling
    },

    i18nCallback : function(response) {
        AJS.log("i18nCallback");
        for (var key in response) {
            tinymce.EditorManager.addI18n(key, response[key]);
        }
    },

    initialiseTinyMce : function() {
        var t = AJS.Editor.Adapter;
        tinymce.EditorManager.preInit.apply(tinymce.EditorManager);
        tinymce.EditorManager.init(t.settings);

        AJS.log("Adapter:after editor manager init");
        tinyMCE.onBeforeUnload.addToTop(AJS.Editor.handleUnload);

        tinymce.confluence.macrobrowser.onTinyMceInitialised(t.getEditor());
        t.editorResetContentChanged(); // so we don't trigger drafts due to macro manipulation
    },

    webResourcePath : "/download/resources/com.atlassian.confluence.tinymceplugin%3Atinymceeditor/",

    // gets the base url from the current location,
    getCurrentBaseUrl : function() {
        if (!this.currentBaseUrl) {
            var l = document.location;
            this.currentBaseUrl = l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "");
        }
        return this.currentBaseUrl;
    },

    // gets the static resource url prefix, which will include the caching headers
    getResourceUrlPrefix : function() {
        if (!this.resourceUrlPrefix) {
            this.resourceUrlPrefix = this.getCurrentBaseUrl() + AJS.params.editorPluginResourcePrefix;
        }
        return this.resourceUrlPrefix;
    },

    // gets the absolute url path to the tinymce web resources, which will include the caching headers
    getTinyMceBaseUrl : function() {
        if (!this.absoluteUrl) {
            this.absoluteUrl =  this.getResourceUrlPrefix() + this.webResourcePath + "tinymcesource/";
        }
        return this.absoluteUrl;
    },

    // For Selenium tests.
    putCursorAtPostionInElement : function (selector, position, node) {
        var ed = tinyMCE.activeEditor, doc = ed.getDoc();

        // need the #text node inside the selected element, so filter the child nodes of the selector
        var el = $(selector, node || doc);
        el = el.contents().filter(function(){ return this.nodeType == 3; })[0];
        var range = this.createRange();
        range.setStart(el, position);
        range.setEnd(el, position);
        ed.selection.setRng(range);
    }

};})(AJS.$);

AJS.toInit(function () {

    AJS.Editor.Adapter.settings = {

        // general
        width: "100%",
        height: AJS.params.paramsHeight,
        document_base_url: AJS.Editor.Adapter.getTinyMceBaseUrl(),
        language: AJS.params.actionLocale,
        button_tile_map: true,
        auto_reset_designmode: true, // recommended for tabs and hidding editors
        plugins: "table,paste,emotions,fullscreen,confluence,contextmenu",
        gecko_spellcheck : true,

        // advanced theme params
        theme: "advanced",
        theme_advanced_buttons1: "formatselect,bold,italic,underline,strikethrough,forecolor,separator," +
                                 "table,row_before,row_after,delete_row,col_before,col_after,delete_col,delete_table,separator," +
                                 "bullist,numlist,outdent,indent,separator," +
                                 "undo,redo,separator," +
                                 "hr,charmap,emotions,conflink,confimage,conf_macro_browser,separator," +
                                 "search,fullscreen,contextmenu",
        theme_advanced_buttons2: "",
        theme_advanced_buttons3: "",
        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_resizing: true,
        theme_advanced_resize_horizontal: false,
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_path: false,
        theme_advanced_blockformats: "h1,h2,h3,h4,h5,h6,macro_quote,macro_panel,macro_code,macro_noformat",

        // selectors for tinymce editors
        mode: "textareas",
        editor_selector: "tinymce-editor",
        elements: "wysiwygTextarea", // editor id

        // callbacks
        oninit: "AJS.Editor.Adapter.tinyMceOnInit",
        handle_event_callback: "AJS.Editor.Adapter.tinyMceEventHandler",

        // table settings
        visual: false,
        confluence_table_style: "confluenceTable",
        confluence_table_cell_style: "confluenceTd",
        confluence_table_header_style: "confluenceTh",
        confluence_table_default_rows: 2,
        confluence_table_default_cols: 2,
        confluence_table_default_heading: true,

        // output settings
        cleanup: false, // don't clean up cause we have special macro attributes which need to be added to "valid_elements"
        valid_elements : '@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup],' +
                         // link attributes need to be added anyway for calls to editor.selection.getContent
                         'a[linktype|wikititle|aliasspecified|originalalias|wikidestination|rel|rev|charset|hreflang|tabindex|accesskey|type|name|href|target|title|class|onfocus|onblur],' +
                         'strong/b,em/i,strike,u,#p[align],-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|src|border|alt=|title|hspace|vspace|width|height|align],' +
                         '-sub,-sup,-blockquote[cite],-table[border=0|cellspacing|cellpadding|width|frame|rules|height|align|summary|bgcolor|background|bordercolor],' +
                         '-tr[rowspan|width|height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,' +
                         '#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor|scope],' +
                         '#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,-span,-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr[size|noshade],' +
                         '-font[face|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],object[classid|width|height|codebase|*],param[name|value],' +
                         'embed[type|width|height|src|*],script[src|type],map[name],area[shape|coords|href|alt|target],bdo,button,col[align|char|charoff|span|valign|width],' +
                         'colgroup[align|char|charoff|span|valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],' +
                         'input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value],kbd,label[for],legend,noscript,' +
                         'optgroup[label|disabled],option[disabled|label|selected|value],q[cite],samp,select[disabled|multiple|name|size],small,' +
                         'textarea[cols|rows|disabled|name|readonly],tt,var,big',
        force_p_newlines: true,
        force_br_newlines: false,

        // layout settings
        body_class: "wiki-content",
        content_css: AJS.Editor.Adapter.getResourceUrlPrefix() + "/styles/combined.css?forWysiwyg=true&spaceKey=" + encodeURI(AJS.params.spaceKey),
        popup_css: AJS.Editor.Adapter.getResourceUrlPrefix() + "/styles/combined.css?spaceKey=" + encodeURI(AJS.params.spaceKey),

        resource_prefix: AJS.Editor.Adapter.getResourceUrlPrefix(),

        // confluence-specific settings
        context_path: AJS.params.contextPath,
        plugin_action_base_path: AJS.params.contextPath + "/plugins/tinymce",
        page_id: (AJS.params.pageId == 0 ? null : AJS.params.pageId),
        draft_type: (AJS.params.pageId == 0 ? AJS.params.draftType : null),
        form_name: AJS.params.formName,
        space_key: encodeURI(AJS.params.spaceKey),
        confluence_popup_width: 620,
        confluence_popup_height: 550
    };

    // request i18n for tinymce, then initialise tinymce
    AJS.$.ajax( { url: AJS.params.editorPluginResourcePrefix + "/plugins/servlet/language/" + AJS.params.actionLocale,
                  cache: true,
                  dataType: "json",
                  success: AJS.Editor.Adapter.i18nCallback,
                  complete: AJS.Editor.Adapter.initialiseTinyMce });
});
