/*--------------------------------------------------------------------------
Classes
--------------------------------------------------------------------------*/

var PagePermissionType = {
    VIEW : "view",
    EDIT : "edit"
};

function PagePermissions()
{
    this.userPermissions = [];
    this.groupPermissions = [];
    this.allPermissions = [];

    this.addUser = function(username)
    {
        this.userPermissions.push(username);
        this.allPermissions.push(username);
    };

    this.removeUser = function(username)
    {
        this.userPermissions = this.userPermissions.without(username);
        this.allPermissions = this.allPermissions.without(username);
    };

    this.addGroup = function(groupname)
    {
        this.groupPermissions.push(groupname);
        this.allPermissions.push(groupname);
    };

    this.removeGroup = function(groupname)
    {
        this.groupPermissions = this.groupPermissions.without(groupname);
        this.allPermissions = this.allPermissions.without(groupname);
    };

    this.indexOf = function(entityName)
    {
        return this.allPermissions.indexOf(entityName);
    };
};

function PermissionManager(type)
{
    var MAX_BATCH_SIZE = 5;
    // see maxCallCount in web.xml

    // queries the server for whether an entityName represents a user or group
    // must perform user check before group check to get around osuser bug
    // perform subsequent group check inside the callback of the user check so it occurs after the user check completes
    this.addPermissions = function(entityNames)
    {
        $('waitImage').style.display = '';

        var entityNamesArray = entityNames.split(",");

        var batchJobs = [];
        for (var i = 0; i < entityNamesArray.length; i++)
        {
            var batchJob = batchJobs[Math.floor(i / this.MAX_BATCH_SIZE)];

            if (!batchJob)
            {
                batchJob = [];
                batchJobs.push(batchJob);
            }

            batchJob.push(entityNamesArray[i]);
        }

        for (i = 0; i < batchJobs.length; i++)
        {
            DWREngine.beginBatch();

            for (var j = 0; j < batchJobs[i].length; j++)
            {
                var entityName = batchJobs[i][j].strip();
                this.addPermission(entityName);
            }

            DWREngine.endBatch({
                errorHandler:function(errorString)
                {
                    $('waitImage').style.display = 'none';
                    alert(errorString);
                }
            });
        }
    };


    // this is an asynchronous function
    // this function must NOT be inlined where it's called
    // doing it this way provides us with function scoping so that we have a new local 'entityName' variable on each invocation
    this.addPermission = function(entityName)
    {
        EntitiesAjaxService.isUser(entityName, function (isUserResult)
        {
            if (isUserResult)
            {
                $('waitImage').style.display = 'none';

                currentPermissionManager.addUserPermission(entityName);
            }
            else
            {
                EntitiesAjaxService.isGroup(entityName, function (isGroupResult)
                {
                    if (isGroupResult)
                    {
                        $('waitImage').style.display = 'none';

                        currentPermissionManager.addGroupPermission(entityName);
                    }
                    else
                    {
                        $('waitImage').style.display = 'none';
                        handleNonExistantEntityName(entityName);
                    }
                });
            }
        });
    };

    this.addUserPermission = function(userName)
    {
        if (!userName)
            return;

        if (Validator.isDuplicateEntityName(userName, type))
        {
            Validator.handleDuplicateEntityName(userName);
            return;
        }

        permissionsTable.addUserPermission(userName, type);
        getPagePermissions(type).addUser(userName);
        PermissionsFormUpdater.onAddUserPermission(userName, type);
    };

    this.addGroupPermission = function(groupName)
    {
        if (!groupName)
            return;

        if (Validator.isDuplicateEntityName(groupName, type))
        {
            Validator.handleDuplicateEntityName(groupName);
            return;
        }

        permissionsTable.addGroupPermission(groupName, type);
        getPagePermissions(type).addGroup(groupName);
        PermissionsFormUpdater.onAddGroupPermission(groupName, type);
    };

    // anchorReference used to help us locate the table row in the DOM
    this.removeUserPermission = function(userName, anchorReference)
    {
        getPagePermissions(type).removeUser(userName);
        permissionsTable.removePermission(anchorReference, type);
        PermissionsFormUpdater.onRemoveUserPermission(type);
    };

    // anchorReference used to help us locate the table row in the DOM
    this.removeGroupPermission = function(groupName, anchorReference)
    {
        getPagePermissions(type).removeGroup(groupName);
        permissionsTable.removePermission(anchorReference, type);
        PermissionsFormUpdater.onRemoveGroupPermission(type);
    };
};

var EntityType = {
    USER : 'user',
    GROUP : 'group'
};

function PermissionsTable(tableReference, showDeleteLinks)
{
    this.permissionTotals = [];
    this.permissionTotals[PagePermissionType.VIEW] = 0;
    this.permissionTotals[PagePermissionType.EDIT] = 0;

    var isDisplayingNoViewPermsSet = false;
    var isDisplayingNoEditPermsSet = false;


    this.addUserPermission = function(userName, permissionType, owningContentTitle)
    {
        this.addPermission(userName, EntityType.USER, permissionType, owningContentTitle);
    };

    this.addGroupPermission = function(groupName, permissionType, owningContentTitle)
    {
        this.addPermission(groupName, EntityType.GROUP, permissionType, owningContentTitle);
    };

    this.addPermission = function(entityName, entityType, permissionType, owningContentTitle)
    {
        this.removeNoRestrictionsSetMessageIfExist(permissionType);

        var newRowElement = tableReference.insertRow(this.getInsertionPoint(permissionType));
        newRowElement.style.display = 'none';
        if (permissionType == PagePermissionType.EDIT && this.permissionTotals[PagePermissionType.EDIT] == 0)
        {
            newRowElement.style.borderTop = '1px solid #cccccc';
        }
        if (tableReference.rows.length % 2 == 0)
            newRowElement.style.backgroundColor = "#f0f0f0";

        var typeIconColumn = newRowElement.insertCell(0);
        typeIconColumn.width = "16px";

        var typeColumn = newRowElement.insertCell(1);

        if (this.permissionTotals[permissionType] == 0)
        {
            this.addRestrictionCategoryMessage(newRowElement, permissionType);            
        }
        else
        {
            typeIconColumn.innerHTML = "&nbsp;";
            typeColumn.innerHTML = "&nbsp;";
        }
        typeColumn.width = "10%";
        typeColumn.noWrap = true;

        var nameColumn = newRowElement.insertCell(2);
        nameColumn.noWrap = true;
        nameColumn.innerHTML = '<img src="' + contextPath + '/images/icons/' + entityType + '_16.gif">&nbsp;' + entityName;
        if (owningContentTitle)
            nameColumn.innerHTML += '&nbsp;<span class="greyText">(' + owningContentTitle + ')</span>';


        var removeColumn = newRowElement.insertCell(3);
        removeColumn.width = "5%";
        if (showDeleteLinks)
        {
            removeColumn.align = "right";
            var permissionManager = (permissionType == PagePermissionType.VIEW ? viewPermissionManager : editPermissionManager);
            var removeMethod = entityType == EntityType.USER ? permissionManager.removeUserPermission : permissionManager.removeGroupPermission;

            var removeLink = AJS.$("<a>"+i18n['perms.remove']+"</a>");
            removeLink.click( function (e) {
                removeMethod(entityName, this);
                return AJS.stopEvent(e);
            });
            AJS.$(removeColumn).append(removeLink);
        }
        else
        {
            removeColumn.innerHTML = '&nbsp;';
        }

        newRowElement.style.display = '';

        this.applyAlternatingRowStyle();
        this.permissionTotals[permissionType]++;
    };

    this.addRestrictionCategoryMessage = function(rowElement, permissionType)
    {
        // it is nasty that this method is actually aware of the positions of these two columns
        var typeIconColumn = rowElement.cells[0];
        var typeColumn = rowElement.cells[1];

        typeIconColumn.innerHTML = '<img src="' + contextPath + '/images/icons/restrictions_' + permissionType + '_16.gif">';
        typeColumn.innerHTML = (permissionType == PagePermissionType.VIEW) ? i18n['page.perms.viewing.restricted'] + "&nbsp;" : i18n['page.perms.editing.restricted'] + "&nbsp;";        
    };

    this.removePermission = function(anchorReference, type)
    {
        var containingTd = anchorReference.parentNode;
        var containingTr = containingTd.parentNode;
        tableReference.getElementsByTagName('tbody')[0].removeChild(containingTr);
        this.permissionTotals[type]--;

        // adjust category message
        if (this.permissionTotals[type] > 0)
        {
            if (type == PagePermissionType.VIEW)
                this.addRestrictionCategoryMessage(tableReference.rows[0], type);
            else if (type == PagePermissionType.EDIT)
                this.addRestrictionCategoryMessage(tableReference.rows[Math.max(1, this.permissionTotals[PagePermissionType.VIEW])], type);
            else
                alert('Invalid type found: ' + type);
        }

        // if all permissions for one type have been removed, restore the row that informs that there are no perms of that type
        this.addNoPermsRowForView();
        this.addNoPermsRowForEdit();
        this.applyAlternatingRowStyle();
    };

    this.getInsertionPoint = function(type)
    {
        // preserve grouping of view and edit permissions in permissions table
        // hence the insertion point point for VIEW permissions should go after the total size of existing view perms
        // and the insertion poitn for EDIT permisions should go after the last row in the table
        if (type == PagePermissionType.VIEW)
            return this.permissionTotals[PagePermissionType.VIEW];
        else
            return tableReference.rows.length;
    };

    this.removeNoRestrictionsSetMessageIfExist = function(type)
    {
        // if they exist, remove them
        if (type == PagePermissionType.VIEW && isDisplayingNoViewPermsSet)
        {
            tableReference.getElementsByTagName('tbody')[0].removeChild($('noViewRestrictionsMessage'));
            isDisplayingNoViewPermsSet = false;
        }
        if (type == PagePermissionType.EDIT && isDisplayingNoEditPermsSet)
        {
            tableReference.getElementsByTagName('tbody')[0].removeChild($('noEditRestrictionsMessage'));
            isDisplayingNoEditPermsSet = false;
        }
    };

    this.applyAlternatingRowStyle = function()
    {
        var rows = tableReference.rows;
        for (var i = 0; i < rows.length; i++)
        {
            rows[i].style.backgroundColor = (i % 2 == 1) ? "#f0f0f0" : "#ffffff";
        }
    };

    this.addNoPermsRowForView = function()
    {
        if (this.permissionTotals[PagePermissionType.VIEW] == 0 && !$('noViewRestrictionsMessage'))
        {
            var newRowElement = tableReference.insertRow(0);
            newRowElement.id = 'noViewRestrictionsMessage';

            var firstColumn = newRowElement.insertCell(0);
            firstColumn.innerHTML = '<img src="' + contextPath + '/images/icons/restrictions_view_16.gif"/>';
            firstColumn.style.width = "16px";

            var secondColumn = newRowElement.insertCell(1);
            secondColumn.colSpan = "3";
            secondColumn.innerHTML = i18n['page.perms.no.view.restrictions'];
            this.applyAlternatingRowStyle();
            isDisplayingNoViewPermsSet = true;
        }
    };

    this.addNoPermsRowForEdit = function()
    {
        if (this.permissionTotals[PagePermissionType.EDIT] == 0 && !$('noEditRestrictionsMessage'))
        {
            var newRowElement = tableReference.insertRow(tableReference.rows.length);
            newRowElement.id = 'noEditRestrictionsMessage';

            var firstColumn = newRowElement.insertCell(0);
            firstColumn.innerHTML = '<img src="' + contextPath + '/images/icons/restrictions_edit_16.gif"/>';
            firstColumn.style.width = "16px";

            var secondColumn = newRowElement.insertCell(1);

            secondColumn.colSpan = "3";
            secondColumn.innerHTML = i18n['page.perms.no.edit.restrictions'];

            newRowElement.style.borderTop = '1px solid #cccccc';
            this.applyAlternatingRowStyle();
            isDisplayingNoEditPermsSet = true;
        }
    };
}

var PermissionsFormUpdater =
{
    onAddUserPermission : function(userName, type)
    {
        this.removeEntityNameFromTextField($('commaDelimitedEntityNames'), userName);
        this.updateUserPermissionsHiddenField(type);
    },

    onRemoveUserPermission : function(type)
    {
        this.updateUserPermissionsHiddenField(type);
    },

    onAddGroupPermission : function(groupName, type)
    {
        this.removeEntityNameFromTextField($('commaDelimitedEntityNames'), groupName);
        this.updateGroupPermissionsHiddenField(type);
    },

    onRemoveGroupPermission : function(type)
    {
        this.updateGroupPermissionsHiddenField(type);
    },

    updateUserPermissionsHiddenField : function(type)
    {
        this.getUserPermissionsHiddenField(type).value = getPagePermissions(type).userPermissions.join();
        // todo: make this cleaner?
    },

    getUserPermissionsHiddenField : function(type)
    {
        if (type == PagePermissionType.VIEW)
            return $('viewPermissionsUsers');
        else
            return $('editPermissionsUsers');
    },

    updateGroupPermissionsHiddenField : function(type)
    {
        this.getGroupPermissionsHiddenField(type).value = getPagePermissions(type).groupPermissions.join();
        // todo: make this cleaner?
    },

    getGroupPermissionsHiddenField : function(type)
    {
        if (type == PagePermissionType.VIEW)
            return $('viewPermissionsGroups');
        else
            return $('editPermissionsGroups');
    },

    removeEntityNameFromTextField : function(textFieldElement, entityNameToRemove)
    {
        if (!textFieldElement.value)
            return;

        if (!entityNameToRemove)
            return;

        var entityNames = textFieldElement.value.split(',');

        for (var i = 0; i < entityNames.length; i++)
        {
            entityNames[i] = entityNames[i].strip();
        }

        // remove all empty strings
        entityNames = entityNames.without('');

        // remove entity name that's just been added
        entityNames = entityNames.without(entityNameToRemove);

        if (entityNames.length > 0)
            textFieldElement.value = entityNames.join(', ');
        else
            textFieldElement.value = '';
    }
};

var Validator =
{
    isDuplicateEntityName : function(entityName, type)
    {
        if (!entityName)
            return false;

        return getPagePermissions(type).indexOf(entityName) > -1;
    },

    handleDuplicateEntityName : function(entityName)
    {
        if (!entityName)
            return;

        duplicateNames.push(entityName);

        var commaDelimitedNames = duplicateNames.join(", ");
        validationErrors['duplicateNames'] = i18n['page.perms.duplicate.names'] + ' ' + commaDelimitedNames;

        updateAndShowValidationErrors();
    }
};

/*--------------------------------------------------------------------------
Global functions
--------------------------------------------------------------------------*/

var validationErrors = new Object();
var unknownNames = [];
var duplicateNames = [];

function getPagePermissions(type)
{
    if (type == PagePermissionType.VIEW)
    {
        return viewPagePermissions;
    }
    else
    {
        return editPagePermissions;
    }
}

// cannot use prototype's Event API because Event.stop() is broken on safari
function handleEnter(evt)
// 'event' is a keyword, so use 'evt' instead
{
    evt = (evt) ? evt : ((window.event) ? window.event : "");

    if (evt)
    {
        if (evt.keyCode && evt.keyCode == Event.KEY_RETURN) // IE and Safari
        {
            onAddPermission();
            return false;
        }
        else if (evt.which && evt.which == Event.KEY_RETURN)// NN4
        {
            onAddPermission();
            return false;
        }
    }

    return true;
}

function onAddPermission()
{
    if (!$F('commaDelimitedEntityNames'))
        return;

    resetValidationErrors();
    currentPermissionManager.addPermissions($F('commaDelimitedEntityNames'));
}

function resetValidationErrors()
{
    AJS.setVisible('#pagePermissionsErrorDiv', false);
    unknownNames = [];
    duplicateNames = [];
    validationErrors = new Object();
}

function handleNonExistantEntityName(entityName)
{
    if (!entityName)
        return;

    unknownNames.push(entityName);
    var commaDelimitedNames = unknownNames.join(", ");

    validationErrors['viewRestrictionsUnknownNames'] = i18n['page.perms.invalid.entity.names'] + ' ' + commaDelimitedNames;
    $('commaDelimitedEntityNames').value = commaDelimitedNames;
    // keep textfield up to date with unknown names so they have a chance to correct them

    updateAndShowValidationErrors();
}

// rebuilds the contents of the pagePermissionsErrorDiv on _every_ invocation
// this method is called as soon as a validation error occurs
// it has been done this way because we don't have the luxury at the moment of hooking into when all asynchronous DWR requests have completed
// until then we will have to respond to errors as they occur, instead of aggregating them and then processing them after all DWR requests are complete
function updateAndShowValidationErrors()
{
    var pagePermissionsErrorDiv = AJS.$('#pagePermissionsErrorDiv');

    var errHtml = "";
    for (var errorKey in validationErrors)
    {
        errHtml += (errHtml.length > 0 ? '<br/>' : '') + validationErrors[errorKey];
    }
    pagePermissionsErrorDiv.html(errHtml);

    AJS.setVisible(pagePermissionsErrorDiv, true);
}

function togglePermissions()
{
    // Proceed if the permissions div is being shown (it won't be if the user lacks permissions, e.g. anonymous)
    var permissionsDiv = AJS.$('#permissionsDiv')[0];
    if (permissionsDiv)
    {
        var permissionsSummaryDiv = AJS.$('#permissionsSummaryDiv');
        var permissionsShowHideLink = AJS.$('#permissions_show_hide_link');

        var isVisible = AJS.isVisible(permissionsDiv);
        AJS.setVisible(permissionsDiv, !isVisible);
        AJS.setVisible(permissionsSummaryDiv, isVisible);

        if (!isVisible) {
            permissionsShowHideLink.html(i18n['done.name.caps']);
        }
        else {
            permissionsShowHideLink.html(i18n['edit.name.caps']);

            // update permissions summary
            var viewPermissions = getPagePermissions(PagePermissionType.VIEW).allPermissions;
            if (viewPermissions.length > 0) {
                $('commaDelimitedViewPermissions').innerHTML = viewPermissions.join(', ');
            }
            AJS.setVisible('#viewPermissionsSummary', viewPermissions.length > 0)

            var editPermissions = getPagePermissions(PagePermissionType.EDIT).allPermissions;
            if (editPermissions.length > 0) {
                $('commaDelimitedEditPermissions').innerHTML = editPermissions.join(', ');
            }
            AJS.setVisible('#editPermissionsSummary', editPermissions.length > 0)
        }
    }

    return false;
}

/*--------------------------------------------------------------------------
Called by pop ups
--------------------------------------------------------------------------*/

function addViewPermissionsUsers(commaDelimitedUserNames)
{
    var userNames = commaDelimitedUserNames.split(",");
    for (var i = 0; i < userNames.length; i++)
    {
        currentPermissionManager.addUserPermission(userNames[i].strip());
    }
}

function addViewPermissionsGroups(commaDelimitedGroupNames)
{
    var groupNames = commaDelimitedGroupNames.split(",");
    for (var i = 0; i < groupNames.length; i++)
    {
        currentPermissionManager.addGroupPermission(groupNames[i].strip());
    }
}
