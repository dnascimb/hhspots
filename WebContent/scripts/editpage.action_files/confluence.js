(function () {
    function expandCurrentSpaceTree() {
        if (!AJS.params.expandedNodes) {
            AJS.params.expandedNodes = [];
        }
        if (AJS.params.actionMode == "create" && AJS.params.parentPageId != "") {
            AJS.params.expandedNodes.push(AJS.params.parentPageId);
        }
        var nodes = [];
        for (var i = 0, ii = AJS.params.expandedNodes.length; i < ii; i++) {
            nodes[i] = {pageId: AJS.params.expandedNodes[i]};
        }
        // we don't need to repopulate the nodes each time
        (expandCurrentSpaceTree = function () {
            tree.expandPath(nodes, function () {
                if (AJS.params.actionMode == "edit"){
                    AJS.PageOrdering.node = tree.findNodeBy("pageId", AJS.params.pageId);
                } else {
                    /* create a new page node */
                    if (AJS.params.parentPageId != ""){
                        toAppendTo = tree.findNodeBy("pageId", AJS.params.parentPageId);
                    } else {
                        toAppendTo = tree;
                    }
                    toAppendTo.append({text: getPageTitleName(), nodeClass: "page-not-created", pageId: "-1"});
                    if (toAppendTo.open) {
                        toAppendTo.open();
                    }
                    AJS.PageOrdering.node = tree.findNodeBy("pageId", "-1");
                }
                AJS.PageOrdering.node.setText(getPageTitleName());
                AJS.PageOrdering.node.highlight();
                AJS.PageOrdering.node.makeDraggable();
            });
        })();
    }
    function showLocationDiv() {
        AJS.setVisible("#location_div", true);
        AJS.$("#location_edit_link").html(AJS.params.doneLabel);
        if (typeof tree == "undefined"){
            (function($) {
                tree = $("#tree-div").tree({
                    url: contextPath + "/pages/children.action",
                    initUrl: contextPath + "/pages/children.action?spaceKey=" + AJS.params.spaceKey + "&node=root",
                    parameters: ["pageId"],
                    undraggable: true,
                    unclickable: true,
                    nodeId: "pageId",
                    drop: function () {
                        $("#position").val(this.position);
                        $("#targetId").val(this.target.pageId);
                        if (this.source.parentNode.parentNode.tagName.toLowerCase() == "div") {
                            $("#parent_info").addClass("hidden");
                            $("#parentPageString").val("");
                        } else {
                            var nodeStr = $("a:first", this.source.parentNode.parentNode).text();
                            $("#parent_content").html(nodeStr);
                            $("#parentPageString").val(nodeStr);
                            $("#parent_info").removeClass("hidden");
                        }
                    },
                    onready: expandCurrentSpaceTree
                });
                $("#newSpaceKey").change(function() {
                    $("#space_content").html(AJS("i").text(this.options[this.options.selectedIndex].text).html());
                    $("#parent_info").addClass("hidden");
                });
            })(AJS.$);
        } else {
            AJS.PageOrdering.node.setText(getPageTitleName());
        }
    }

    function getPageTitleName() {
        return AJS.$("input#content-title").val();
    }

    function toggleLocation(e) {
        if (AJS.isVisible("#location_div")) {
            AJS.setVisible("#location_div", false);
            AJS.$("#location_edit_link").html(AJS.params.editLabel);
        }
        else {
            showLocationDiv();
        }
        e.stopPropagation();
        return false;
    }

    function spaceChanged() {
        var selectbox = AJS.$("#newSpaceKey"),
        selectedSpaceKey = selectbox.val();
        AJS.$("#position").val("topLevel");
        AJS.$("#targetId").val("");
        AJS.$("#parentPageString").val("");
        tree = tree.reload({
            initUrl: contextPath + "/pages/children.action?spaceKey=" + selectedSpaceKey + "&node=root" ,
            onready: selectedSpaceKey == AJS.params.spaceKey ? expandCurrentSpaceTree : function() {
                tree.append(AJS.PageOrdering.node);
                AJS.PageOrdering.node = tree.findNodeBy("pageId", AJS.PageOrdering.node.pageId);
                AJS.PageOrdering.node.highlight();
                AJS.PageOrdering.node.makeDraggable();
            }
        });
    }

    AJS.toInit(function () {
        AJS.$("#newSpaceKey").change(spaceChanged);
        AJS.$("#location_edit_link").click(toggleLocation);

        if(AJS.params.showLocation) {
            showLocationDiv();
        }
        AJS.PageOrdering = {};
    });
})();