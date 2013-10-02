(function ($) {

    $.ui = $.ui || {};

    $.fn.extend({
        spinner: function (options) {
            if (!this.is(".ui-spinner")) {
                return new $.ui.spinner(this, options || {});
            }
        }
    });


    $.ui.spinner = function (anchor, options) {
        this.anchor = anchor;
        this.images = options.images || 
            [
                contextPath + "/images/ddtree/black spinner/1.png", 
                contextPath + "/images/ddtree/black spinner/2.png", 
                contextPath + "/images/ddtree/black spinner/3.png",
                contextPath + "/images/ddtree/black spinner/4.png", 
                contextPath + "/images/ddtree/black spinner/5.png", 
                contextPath + "/images/ddtree/black spinner/6.png", 
                contextPath + "/images/ddtree/black spinner/7.png", 
                contextPath + "/images/ddtree/black spinner/8.png", 
                contextPath + "/images/ddtree/black spinner/9.png", 
                contextPath + "/images/ddtree/black spinner/10.png", 
                contextPath + "/images/ddtree/black spinner/11.png",
                contextPath + "/images/ddtree/black spinner/12.png"
            ];
        this.width = options.width || "16px";
        this.height = options.height || options.width || "16px";
        this.hide = function () {
            this.anchor.hide();
            this.stop();
        };
        this.show = function () {
            this.start();
            this.anchor.show();
        };
        this.fadeIn = function () {
            this.anchor.fadeIn.apply(this.anchor, arguments);
        };
        this.fadeOut = function () {
            this.anchor.fadeOut.apply(this.anchor, arguments);
        };
        this.moveTo = function (x, y) {
            this.anchor.css("top", y);
            this.anchor.css("left", x);
        };
        this.putInBox = function (box) {
            var x = box.x || box.x1,
                y = box.y || box.y1,
                width = (typeof box.width == "undefined") ? box.x2 - box.x1 : box.width,
                height = (typeof box.height == "undefined") ? box.y2 - box.y1 : box.height;
            this.moveTo(x + Math.round((width - this.offsetWidth) / 2), y + Math.round((height - this.offsetHeight) / 2));
        };
        this.start = function () {
            if (!this.timer) {
                this.timer = setInterval(spin, 100);
            }
            return this.timer;
        };
        this.stop = function () {
            clearInterval(this.timer);
            this.timer = null;
        };
        this.divs = [];
        var isIE = /*@cc_on1@*/0;
        for (var i = 0, ii = this.images.length; i < ii; i++) {
            var div = document.createElement("div");
            if (isIE) {
                div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.images[i] + "', sizingMethod='scale')";
            } else {
                var img = document.createElement("img");
                img.src = this.images[i];
                img.style.width = this.width;
                img.style.height = this.height;
                div.appendChild(img);
            }
            div.style.width = this.width;
            div.style.height = this.height;
            this.anchor.append(div);
            if (!this.offsetWidth) {
                this.offsetWidth = div.offsetWidth;
                this.offsetHeight = div.offsetHeight;
            }
            this.divs.push($(div).hide());
        };
        this.frame = 0;
        this.direction = 1;
        var spinner = this;
        var spin = function () {
            spinner.divs[spinner.frame].hide();
            spinner.frame += spinner.direction;
            if (spinner.frame >= spinner.divs.length) {
                spinner.frame = 0;
            }
            if (spinner.frame < 0) {
                spinner.frame = spinner.divs.length - 1;
            }
            spinner.divs[spinner.frame].show();
        };
        this.anchor.css("position", "absolute");
    };
})(jQuery);// See http://confluence.atlassian.com/pages/viewpage.action?pageId=155813439 for documentation
(function ($) {

    // Check for ui namespace in jQuery
    $.ui = $.ui || {};

    // Adding tree function to jQuery
    // $("#tree").tree();
    $.fn.extend({
        tree: function (options){
            if (!this.is(".ui-tree")) {
                return new $.ui.tree(this, options);
            }
        }
    });


    // The tree object
    $.ui.tree = function (element, options) {
        var el = element,
            tree = this,
            elCreated = false,
            args = arguments;
        // if element is not a list, create one and add it into the element, in which case
        // set a flag to enable removal when tree reloaded
        if (!(/^[ou]l$/i.test(el[0].tagName))) {
            elCreated = true;
            if (!options.url) {
                return false;
            }
            el.html("<ul></ul>");
            el = $("ul", el);
        }
        var root = el[0];   // either a <ul> or an <ol>
        el.addClass("ui-tree");

        // private varibles
        var obj = {
            list: el,
            // array of the items as they appear on the screen
            visibleNodes: [],
            dim: el.offset(),
            // array of the pixels assosiated with items from visibleNodes array
            points: [],
            win: $(window),
            timer: null,
            prev: 0,
            events: {
                grab: function () {},
                drag: function () {},
                drop: function () {},
                append: function () {},
                insertabove: function () {},
                insertbelow: function () {},
                load: function () {},
                nodeover: function () {},
                nodeout: function () {},
                onready: function () {},
                order: function() {},
                orderUndo: function() {},
                remove: function() {},
                preview: function() {}
            }
        };

        this.options = options;
        // These functions could be usefull for debug
        // this.getLis = function () {
        //     return obj.visibleNodes;
        // };
        // this.getPoints = function () {
        //     return obj.points;
        // };
        // this.update = function () {
        //     updatePoints();
        // };

        /**
        * expands nodes by names provided
        * @method expandPath
        * @param {String | function} set of names to be expanded or/and callback function
        * @return {void}
        */
        this.expandPath = function (attr, f) {
            f = f || function () {};
            if (attr.length) {
                var n = 1, node;
                for (var name in attr[0]) {
                    node = this.findNodeBy(name, attr[0][name]);
                    break;
                }
                // silently return if we can't find the node to expand
                if(!node) {
                    return;
                }
                node.open(function () {
                    if (n < attr.length) {
                        for (name in attr[n]) {
                            node = tree.findNodeBy(name, attr[n][name]);
                            if (node) {
                                break;
                            }
                        }
                        n++;
                        node.open(arguments.callee);
                    } else {
                        f();
                    }
                });
            } else {
                f();
            }
        };
        /**
        * reloads the tree
        * @method reload
        * @param {Object} options for recreating tree
        * @return {Object} new tree object
        */
        this.reload = function (options) {
            if (elCreated) {
                el.remove();
            }
            for (var i in options) {
                this.options[i] = options[i];
            }
            return new args.callee(element, this.options);
        };
        /**
        * appends node to the tree
        * @method append
        * @param {Object} node object
        * @return {void}
        */
        this.append = function (node) {
            var newnode = createLI(node);
            el.append(newnode);
            prepareLI.call(newnode);
            updateVisibleNodes();
        };


        function alphanum(a, b) {
            var chunks = /(\d+|\D+)/g,
                am = a.match(chunks),
                bm = b.match(chunks),
                len = Math.max(am.length, bm.length);
            for (var i = 0; i < len; i++) {
                if (i == am.length) {
                    return -1;
                }
                if (i == bm.length) {
                    return 1;
                }
                var ad = parseInt(am[i], 10),
                    bd = parseInt(bm[i], 10);
                if (ad == am[i] && bd == bm[i] && ad != bd) {
                    return (ad - bd) / Math.abs(ad - bd);
                }
                if ((ad != am[i] || bd != bm[i]) && am[i] != bm[i]) {
                    return am[i] < bm[i] ? -1 : 1;
                }
            }
            return 0;
        }



        function node($li) {
            this[0] = $li[0];
            this.$ = $li;
            this.text = $li.find("span").html();
            this.href = $li.find("a").attr("href");
            this.linkClass = $li.find("a").attr("class");
            this.nodeClass = $li.attr("class");
            this.open = function (callback) {
                return obj.visibleNodes[this[0].num].open(callback);
            };
            this.close = function () {
                obj.visibleNodes[this[0].num].close();
            };
            this.getAttribute = function (attribute){
                return this[0][attribute];
            };
            this.setAttribute = function (attribute, value){
                this[0][attribute] = value;
            };
            this.highlight = function () {
                this.$.addClass("highlighted");
            };
            this.makeDraggable = function () {
                this.setAttribute("undraggable", false);
                this.$.removeClass("undraggable");
            };
            this.makeUndraggable = function () {
                this.setAttribute("undraggable", true);
                this.$.addClass("undraggable");
            };
            this.setText = function(nodeText) {
                this.text = nodeText;
                this[0].text = nodeText;
                this.$.find("span").html(nodeText);
            };
            this.append = function (node) {
                var uls = this.$.find("ul");
                if (!uls.length) {
                    if (this[0].toBeLoaded) {
                        var theNode = this;
                        this.open(function () {theNode.append(node);});
                        return false;
                    }
                    this.$.append("<ul></ul>");
                    uls = this.$.find("ul");
                }
                var newli = createLI(node);
                uls.append(newli);
                prepareLI.call(newli);
                if (typeof this[0].closed == "undefined") {
                    this.$.addClass("closed");
                    this[0].closed = true;
                    uls.hide();
                }
                updateVisibleNodes();
            };
            this.below = function (node) {
                var newnode = createLI(node);
                this.$.after(newnode);
                prepareLI.call(newnode);
                updateVisibleNodes();
            };
            this.above = function (node) {
                var newnode = createLI(node);
                this.$.before(newnode);
                prepareLI.call(newnode);
                updateVisibleNodes();
            };
            this.remove = function () {
                this.$.remove();
                updateVisibleNodes();
            };
            this.reload = function () {
                if (this[0].getElementsByTagName("ul").length) {
                    this[0].removeChild(this[0].getElementsByTagName("ul")[0]);
                    this.$.removeClass("opened").addClass("closed");
                    this[0].closed = true;
                    obj.visibleNodes[this[0].num].open();
                }
            };
            this.order = function (orderer) {
                this[0].ordered = true;
                var $ul = $("ul", this.$);
                if ($ul.length) {
                    var oldorder = [];
                    this[0].oldorder = [];
                    $("li", this.$).each(function () {
                        oldorder.push(this);
                        this[0].oldorder.push(this);
                    });
                    function sorter(a, b) {
                        return orderer($(a).find("span").html(), $(b).find("span").html());
                    }
                    oldorder.sort(sorter);
                    this[0].order = oldorder;
                    for (var i = 0, ii = oldorder.length; i < ii; i++) {
                        $ul.append(oldorder[i]);
                    }
                }
                updateVisibleNodes();
            };
            this.orderUndo = function () {
                this[0].ordered = false;
                var $ul = $("ul", this.$);
                if (this[0].oldorder && $ul.length) {
                    for (var i = 0, ii = this[0].oldorder.length; i < ii; i++) {
                        $ul.append(this[0].oldorder[i]);
                    }
                }
                this[0].oldorder = null;
                updateVisibleNodes();
            };
            this.setOrdered = function (isOrdered) {
                this[0].ordered = isOrdered;
                $("a.abc:first", this).css("display", isOrdered ? "none" : "block");
                $("a.rollback:first", this).css("display", "none");
            };
            // Copy any other custom parameters to this object
             if (tree.options.parameters && tree.options.parameters.length) {
                 for (var j = 0, jj = tree.options.parameters.length; j < jj; j++) {
                     if ($li[0][tree.options.parameters[j]]) {
                         this[tree.options.parameters[j]] = $li[0][tree.options.parameters[j]];
                     }
                 }
             }
        }
        /**
        * finds a node in the tree by its attribute
        * @method findNodeBy
        * @param {String} attributeName name of the atribute
        * @param {String} attributeValue value of the atribute
        * @return {Object | Array} node object or array of nodes
        */
        this.findNodeBy = function (attributeName, attributeValue) {
            var results = [], lis = root.getElementsByTagName("li");
            for (var i = 0, ii = lis.length; i < ii; i++) {
                if (lis[i][attributeName] == attributeValue) {
                    // Here we creating an object to be used as a return value
                    results.push(new node($(lis[i])));
                }
            }

            if (results.length == 0) {
                return null;
            } else if (results.length == 1) {
                return results[0];
            } else {
                return results;
            }
        };

        if (options.url) {
            // Spinner
            var div = document.createElement("div");
            div.className = "tree-spinner";
            $("body").append(div);
            obj.spinner = $(div).spinner();
            obj.spinner.hide();
        }

        // copy event handlers from options to obj.events
        for (var i in obj.events) {
            if (typeof options[i] == "function") {
                obj.events[i] = options[i];
            }
        }


        // Object container for nodes in the tree
        function VisibleNode(li) {
            this.$li = $(li);
            this.height = this.$li.height();
        }
        VisibleNode.prototype.append = function (li) {
            if (this.$li[0] == li) {
                return false;
            }
            if (this.$li[0].toBeLoaded) {
                var item = this;
                this.load(function () {item.append(li);});
                return false;
            }
            if (this.$li[0].tagName.toLowerCase() == "li") {
                var ul = $("ul:first", this.$li);
                var grandpa = li.parentNode.parentNode;
                $(".rollback:first", grandpa).css("display", "none");
                if (ul.length) {
                    ul.append(li);
                    if (this.$li[0].ordered) {
                        this.order(alphanum);
                    }
                } else {
                    ul = document.createElement("ul");
                    ul.appendChild(li);
                    this.$li[0].appendChild(ul);
                    this.$li.addClass("opened");
                    $(".click-zone:first", this.$li).css("display", "inline");
                    $(".rollback:first", this.$li).css("display", "none");
                }
                if (grandpa.tagName.toLowerCase() == "li" && $("li", grandpa).length < 2) {
                    obj.visibleNodes[grandpa.num].notaFolderAnymore();
                }
                setTimeout(updateVisibleNodes, 0);
                obj.events.append.call({source: li, target: this.$li[0]});
            }
        };
        VisibleNode.prototype.below = function (li) {
            var grandpa = li.parentNode.parentNode;
            this.$li.after(li);
            $(".rollback:first", grandpa).css("display", "none");
            if (grandpa.tagName.toLowerCase() == "li" && $("li", grandpa).length < 2) {
                obj.visibleNodes[grandpa.num].notaFolderAnymore();
            } else {
                if (!$(li.parentNode).hasClass("ui-tree") && !li.parentNode.parentNode.undraggable) {
                    li.parentNode.parentNode.ordered = false;
                    $(".abc:first", li.parentNode.parentNode).css("display", "block");
                    $(".rollback:first", li.parentNode.parentNode).css("display", "none");
                }
            }
            setTimeout(updateVisibleNodes, 0);
            obj.events.insertbelow.call({source: li, target: this.$li[0]});
        };
        VisibleNode.prototype.above = function (li) {
            var grandpa = li.parentNode.parentNode;
            this.$li.before(li);
            $(".rollback:first", grandpa).css("display", "none");
            if (grandpa.tagName.toLowerCase() == "li" && $("li", grandpa).length < 2) {
                obj.visibleNodes[grandpa.num].notaFolderAnymore();
            } else {
                if (!$(li.parentNode).hasClass("ui-tree") && !li.parentNode.parentNode.undraggable) {
                    li.parentNode.parentNode.ordered = false;
                    $(".abc:first", li.parentNode.parentNode).css("display", "block");
                    $(".rollback:first", li.parentNode.parentNode).css("display", "none");
                }
            }
            setTimeout(updateVisibleNodes, 0);
            obj.events.insertabove.call({source: li, target: this.$li[0]});
        };
        VisibleNode.prototype.order = function (orderer) {
            var li = this.$li[0];
            li.ordered = true;
            var $ul = $("ul:first", this.$li);
            if ($ul.length) {
                var oldorder = [];
                li.oldorder = [];
                $("li", this.$li).each(function () {
                    if (this.parentNode.parentNode == li) {
                        oldorder.push(this);
                        li.oldorder.push(this);
                    }
                });
                function sorter(a, b) {
                    return orderer($(a).find("span").html(), $(b).find("span").html());
                }
                oldorder.sort(sorter);
                li.order = oldorder;
                for (var i = 0, ii = oldorder.length; i < ii; i++) {
                    $ul.append(oldorder[i]);
                }
            }
            updateVisibleNodes();
        };
        VisibleNode.prototype.orderUndo = function () {
            var li = this.$li[0];
            li.ordered = false;
            var $ul = $("ul:first", this.$li);
            if (li.oldorder && $ul.length && $ul[0].parentNode == li) {
                for (var i = 0, ii = li.oldorder.length; i < ii; i++) {
                    $ul.append(li.oldorder[i]);
                }
            }
            li.oldorder = null;
            li.oldor = null;
            updateVisibleNodes();
        };
        VisibleNode.prototype.open = function (callback) {
            callback = callback || function () {};
            if (this.$li.hasClass("closed")) {
                var ul = $("ul:has(li)", this.$li);
                if (ul.length) {
                    ul.show();
                    this.closed = false;
                    this.$li.removeClass("closed").addClass("opened");
                    updateVisibleNodes();
                    callback(true);
                    return true;
                } else {
                    return this.load(callback);
                }
            }
            callback(false);
            return false;
        };
        VisibleNode.prototype.close = function (callback) {
            callback = callback || function () {};
            var ul = this.$li.contents().filter("ul:has(li)");
            if (ul.length) {
                ul.hide();
                this.closed = true;
                this.$li.removeClass("opened").addClass("closed");
                obj.visibleNodes.splice(this.$li[0].num + 1, ul[0].getElementsByTagName("li").length);
                updateVisibleNodes();
                callback();
            }
        };
        VisibleNode.prototype.load = function (callback) {
            var url = tree.options.url;
            if (!url) {
                return false;
            }
            callback = callback || function () {};
            this.$li[0].toBeLoaded = false;
            this.$li[0].closed = true;
            if (options.parameters && options.parameters.length) {
                for (var i = 0, ii = options.parameters.length; i < ii; i++) {
                    url += (i?"&":"?") + options.parameters[i] + "=" + (this.$li[0][options.parameters[i]] || "");
                }
            }
            var node = this,
                span = this.$li[0].getElementsByTagName("span")[0],
                spanWidth = span.offsetWidth,
                spanLeft = $(span).offset().left;
            node.loading = true;
            obj.spinner.putInBox({x:spanLeft + spanWidth, y: this.top, width: 25, height: obj.H});
            obj.spinner.show();
            $.getJSON(url, function (data) {
                var ul = $("ul", node.$li);
                if (!ul.length) {
                    ul = document.createElement("ul");
                    node.$li[0].appendChild(ul);
                    ul = $(ul);
                }
                node.ordered = (typeof data[0].position != "number");
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var li = createLI(data[i]);
                    ul[0].appendChild(li);
                    prepareLI.call(li);
                }
                ul.hide();
                //  this will clear the loading flag
                node.open(callback);
                obj.events.load();
                obj.spinner.hide();

                // Now know which button should be active, based on node.ordered..
                // Never show revert before changes are made, but show ABC if already ordered.
                node.$li[0].ordered = node.ordered;
                $(".abc:first", node.$li[0]).css("display", node.ordered || li.undraggable ? "none" : "block");
                $(".rollback:first", node.$li[0]).css("display", "none");
            });
            return true;
        };
        VisibleNode.prototype.notaFolderAnymore = function () {
            this.$li.removeClass("closed").removeClass("opened");
            $(".click-zone:first", this.$li).hide();
            $(".abc:first", this.$li).css("display", "none");
            $(".rollback:first", this.$li).css("display", "none");
            var ul = this.$li[0].getElementsByTagName("ul");
            this.closed = false;
            if (ul.length) {
                this.$li[0].removeChild(ul[0]);
            }
        };

        /**
        * finds a node in the tree by its y coordinate and returns it as a bundle
        * @method getItem
        * @param {String} num name of the atribute
        * @return {Object} bundle of visibleNode, where and top
        */
        function getItem(num) {
            var p = obj.points[num];
            if (typeof p != "undefined") {
                return {visibleNode: obj.visibleNodes[p.num], where: p.where, top: p.top};
            } else {
                return {visibleNode: new VisibleNode(root), where: "append", top: obj.dim.top};
            }
        }

        /**
         * Rebuilds the array of tree nodes by y-coordinate.
         */
        function updatePoints() {
            var prev = {y: 0, num: 0};
            obj.points = [];
            for (var j = 0, jj = obj.visibleNodes.length; j < jj; j++) {
                var offset = obj.visibleNodes[j].$li.offset(),
                    y = offset.top;
                obj.visibleNodes[j].top = y;
                obj.visibleNodes[j].left = offset.left;
                if (prev.y) {
                    var q = (y - prev.y) / 4;
                    for (var i = prev.y; i < y; i++) {
                        var where = (i - prev.y < q)?"above":(i - prev.y < q * 3)?"append":"below";
                        obj.points[i] = {num: prev.num, where: where, top: prev.y};
                    }
                }
                if (j == jj - 1) {
                    var q = (obj.visibleNodes[j].height) / 4;
                    for (var i = y; i < y + obj.visibleNodes[j].height; i++) {
                        var where = (i - y < q)?"above":(i - y < q * 3)?"append":"below";
                        obj.points[i] = {num: j, where: where, top: y};
                    }
                }
                prev.y = y;
                prev.num = j;
            }
        }
        function updateVisibleNodes() {
            obj.visibleNodes = [];
            var lis = $("li:visible", root); //root.getElementsByTagName("li");
            for (var i = 0, ii = lis.length; i < ii; i++) {
                if (!$(lis[i]).hasClass("tree-helper")) {
                    lis[i].num = obj.visibleNodes.length;
                    obj.visibleNodes.push(new VisibleNode(lis[i]));
                }
            }
            updatePoints();
        }
        this.updateVisibleNodes = updateVisibleNodes;

        // Jquery-specific options for passing to "node.draggable" later. Separated for readability.
        var draggableOptions = function() { return {
                distance: 3,
                helper: function () {
                    var helper = $(this).clone().append("<strong></strong>").addClass("tree-helper");
                    $(".button-panel", helper).remove();
                    return helper;
                },
                cursorAt: {top: obj.H / 2, left: 30},
                stop: function(e, ui) {
                    clearInterval(obj.timer);
                    clearTimeout(obj.opentimer);
                    obj.opentimer = null;
                    var item = getItem(obj.prev);
                    item.visibleNode.$li.removeClass("over").removeClass("above").removeClass("append").removeClass("below");
                    item.visibleNode.$li.next().removeClass("over").removeClass("above").removeClass("append").removeClass("below");
                    obj.win.unbind("keypress", obj.escape);
                    delete obj.escape;
                    if (ui.instance.options.revert) {
                        ui.instance.options.revert = false;
                        return false;
                    }
                    item = getItem(e.pageY);
                    // check if the target is the source or it's children
                    var ele = item.visibleNode.$li[0], isOk = true;
                    while (ele != root) {
                        if (ele == ui.instance.element[0]) {
                            isOk = false;
                            break;
                        }
                        ele = ele.parentNode;
                    }
                    // don't insert above next element and don't append to element's parent
                    isOk =  isOk && !(item.where == "above" && item.visibleNode.$li.prev()[0] == ui.instance.element[0]) &&
                            !(item.where == "append" && item.visibleNode.$li[0] == ui.instance.element[0].parentNode.parentNode);
                    if (isOk) {
                        item.visibleNode[item.where](ui.instance.element[0]);
                        obj.events.drop.call({position: item.where, source: ui.instance.element[0], target: item.visibleNode.$li[0]});
                    }
                },
                start: function (e, ui) {
                    obj.events.grab.call(ui.instance.element[0]);
                    if (ui.instance.element[0].undraggable) {
                        ui.helper.addClass("no");
                        ui.instance.options.revert = true;
                    }
                    obj.escape = function (e) {
                        if (e.keyCode == 27) {
                            var item = getItem(obj.prev);
                            item.visibleNode.$li.removeClass("over").removeClass("above").removeClass("append").removeClass("below");
                            item.visibleNode.$li.next().removeClass("over").removeClass("above").removeClass("append").removeClass("below");
                            var newhelper = ui.helper.clone();
                            ui.helper.before(newhelper);
                            newhelper.animate({left: ui.instance.elementOffset.left + "px", top: ui.instance.elementOffset.top + "px", opacity: 0}, "slow", "swing", function () {newhelper.remove();});
                            ui.helper.css("display", "none");
                            ui.instance.options.revert = true;
                        }
                    };
                    obj.win.keypress(obj.escape);
                },
                drag: function (e, ui) {
                    var olditem = getItem(obj.prev);
                    olditem.visibleNode.$li.removeClass("above").removeClass("append").removeClass("below");
                    olditem.visibleNode.$li.next().removeClass("above").removeClass("append").removeClass("below");
                    if (!ui.instance.options.revert || obj.out) {
                        obj.prev = e.pageY;
                        var item = getItem(obj.prev);
                        if (item.visibleNode.$li[0] == root) {
                            ui.instance.options.revert = true;
                            obj.out = true;
                            return;
                        } else {
                            if (obj.out) {
                                obj.out = false;
                                ui.instance.options.revert = false;
                            }
                        }
                        if (item.visibleNode != olditem.visibleNode) {
                            obj.events.nodeout.call(olditem.visibleNode.$li);
                            if (obj.opentimer) {
                                clearTimeout(obj.opentimer);
                                obj.opentimer = false;
                            }
                        }
                        obj.events.nodeover.call({element: item.visibleNode.$li, position: item.where});
                        var className = item.where,
                            next = item.visibleNode.$li.next();
                        if (className == "below" && next.length && !next.hasClass("tree-helper")) {
                            next.addClass("above");
                        } else {
                            getItem(obj.prev).visibleNode.$li.addClass(className);
                        }
                        // Openning
                        if (item.where == "append" && (item.visibleNode.closed || item.visibleNode.$li[0].toBeLoaded) && !obj.opentimer) {
                            obj.opentimer = (function (item) {
                                return setTimeout(function () {
                                    item.visibleNode.$li.removeClass("append");
                                    item.visibleNode.open(function () {obj.opentimer = false;});
                                }, 500);
                            })(item);
                        }
                        // Scrolling
                        var f = arguments.callee;
                        if (obj.win.height() - e.pageY + obj.win.scrollTop() < 30) {
                            clearInterval(obj.timer);
                            obj.timer = setInterval(function () {
                                window.scrollBy(0, 4);
                                ui.helper.css("top", parseInt(ui.helper.css("top")) + 4 + "px");
                                f({pageY: e.pageY + 4}, ui);
                            }, obj.win.height() - e.pageY + obj.win.scrollTop());
                        } else {
                            if (obj.win.scrollTop() > 0 && (e.pageY - obj.win.scrollTop()) < 30) {
                                clearInterval(obj.timer);
                                obj.timer = setInterval(function () {
                                    window.scrollBy(0, -4);
                                    f({pageY: e.pageY - 4}, ui);
                                    ui.helper.css("top", parseInt(ui.helper.css("top")) - 4 + "px");
                                }, e.pageY - obj.win.scrollTop());
                            } else {
                                if (obj.timer) {
                                    clearInterval(obj.timer);
                                }
                            }
                        }
                        obj.events.drag.call({element: ui.instance.element[0], left: e.pageX, top: e.pageY});
                    }
                }
            };
        };

        // adds necessary event handlers to HTML <li>
        function prepareLI() {
            var node = $(this);
            node.draggable(draggableOptions());
            if (node.hasClass("undraggable") || tree.options.undraggable) {
                node[0].undraggable = true;
            }
            var a = $(this.getElementsByTagName("a")[0]);
            if (tree.options.unclickable) {
                node.addClass("unclickable");
            }
            if (node.hasClass("unclickable")) {
                a.click(function (e) {
                    e.preventDefault();
                });
            }
            // a.keydown(function (e) {
            //     var item = obj.visibleNodes[node[0].num];
            //     if (e.keyCode == 39 || e.keyCode == 37) { // right or left
            //         $(this).prev().click();
            //     }
            //     if (e.keyCode == 40) { // down
            //         if (node[0].num + 1 < obj.visibleNodes.length) {
            //             obj.visibleNodes[node[0].num + 1].$li[0].getElementsByTagName("a")[0].focus();
            //         }
            //     }
            //     if (e.keyCode == 38) { // up
            //         if (node[0].num - 1 >= 0) {
            //             obj.visibleNodes[node[0].num - 1].$li[0].getElementsByTagName("a")[0].focus();
            //         }
            //     }
            //     e.preventDefault();
            // });
        };

        $.ui.tree.callNumber = 0;
        function createLI(node) {
            var li = document.createElement("li");
            li.className = node.nodeClass;
            if (tree.options.parameters && tree.options.parameters.length) {
                for (var j = 0, jj = tree.options.parameters.length; j < jj; j++) {
                    if (node[tree.options.parameters[j]]) {
                        li[tree.options.parameters[j]] = node[tree.options.parameters[j]];
                    }
                }
            }
            if (tree.options.nodeId) {
                li.id = "node-" + node[tree.options.nodeId];
            }
            var a = document.createElement("a");
            var span = document.createElement("span");
            a.href = node.href;
            span.innerHTML = node.text;
            a.appendChild(span);
            a.className = node.linkClass;
            clickZone = document.createElement("div");
            $(clickZone).addClass("click-zone");
            var getTarget = function (e) {
                if (e) {
                    getTarget = function () {
                        target = e.target;
                        (target.nodeType == 3) && (target = target.parentNode);
                        return target;
                    };
                } else {
                    getTarget = function () {
                        return window.event.srcElement;
                    };
                }
                return getTarget(e);
            };
            clickZone.onclick = (function (e) {
                if (obj.visibleNodes[this.parentNode.num].loading){
                    return;
                }
                if ($(this.parentNode).hasClass("closed")) {
                    obj.visibleNodes[this.parentNode.num].open();
                } else {
                    obj.visibleNodes[this.parentNode.num].close();
                }
                return false;
            });
            li.onmouseover = (function (e) {
                if (!$(getTarget(e)).hasClass("tree-helper")) {
                    $(".button-panel:first", this).addClass("hover");
                }
                return false;
            });
            li.onmouseout = (function (e) {
                if (!$(getTarget(e)).hasClass("tree-helper")) {
                    $(".button-panel:first", this).removeClass("hover");
                }
                return false;
            });
            li.appendChild(clickZone);
            li.appendChild(a);

            var div = document.createElement("div");
            div.className = "button-panel";
            li.appendChild(div);

            var abc = document.createElement("a");
            abc.className = "abc";
            abc.title = "Sort Alphabetically";
            div.appendChild(abc);

            var cba = document.createElement("a");
            cba.className = "rollback";
            cba.title = "Undo Sorting";
            div.appendChild(cba);

            abc.onclick = function (e) {
                var item = obj.visibleNodes[this.parentNode.parentNode.num];
                item.order(alphanum);
                obj.events.order.call({source: item.$li[0]});
                $(this).hide();
                $(cba).show();
                return false;
            };
            cba.onclick = function (e) {
                var item = obj.visibleNodes[this.parentNode.parentNode.num];
                item.orderUndo();
                obj.events.orderUndo.call({source: item.$li[0], orderedChildren: $("ul:first", item.$li[0]).children()});
                $(this).hide();
                $(abc).show();
                return false;
            };
            if (tree.options.isAdministrator) {
                var preview = document.createElement("a");
                preview.className = "preview-node";
                preview.title = "Preview";
                div.appendChild(preview);

                $(preview).click(function (e) {
                    e.preventDefault();
                    var item = obj.visibleNodes[this.parentNode.parentNode.num];
                    obj.events.preview.call({source: preview, node: item.$li[0]});
                });

                var rem = document.createElement("a");
                rem.className = "remove-node";
                rem.title = "Delete";
                div.appendChild(rem);

                $(rem).click(function (e) {
                    e.preventDefault();
                    var item = obj.visibleNodes[this.parentNode.parentNode.num];
                    obj.events.remove.call({source: item.$li[0]});
                });

            }

            $(abc).css("display", "none");
            $(cba).css("display", "none");

            var $li = $(li);
            if ($li.hasClass("opened")) {
                $li.removeClass("opened").addClass("closed");
                li.closed = true;
            } else if ($li.hasClass("closed")) {
                li.toBeLoaded = true;
            } else {
                $(clickZone).css("display", "none");
            }
            return li;
        }

        // initialisation
        var li = el.contents().filter("li");
        if (li.length > 0) {
            // some tree data exists in the DOM already
            obj.H = li.height();
            li.each(prepareLI);
            updateVisibleNodes();
            obj.events.onready.call(this);
        } else {
            // all tree data is to be loaded from back-end
            var url = tree.options.initUrl || tree.options.url;
            if (!url) {
                return false;
            }
            obj.spinner.putInBox({x: obj.dim.left, y: obj.dim.top, width: 16, height: 16});
            obj.spinner.show();
            var call = ++$.ui.tree.callNumber;
            $.getJSON(url, function (data) {
                var dt = (new Date()).getTime();
                for (var i = 0, ii = data.length; i < ii; i++) {
                    var li = createLI(data[i]);
                    root.appendChild(li);
                    if (i == 0) {
                        obj.H = $(li).height();
                    }
                    prepareLI.call(li);
                }
                updateVisibleNodes();
                obj.spinner.hide();
                // if the data was re-requested again we only call onready for the latest request
                if (call == $.ui.tree.callNumber){
                    obj.events.onready.call(this);
                    $.ui.tree.callNumber = 0;
                }
            });
        }
        obj.offset = root.offsetTop;
        setInterval(function () {
            if (root.offsetTop != obj.offset) {
                updatePoints();
                obj.offset = root.offsetTop;
            }
        }, 10);
        return this;
    };
})(jQuery);