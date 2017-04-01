//Global Information storage
var notesActiveTab = {"notesActiveTabId" : chrome.tabs.TAB_ID_NONE, 
						"notesActiveTabMsgCount" : "0",
						"notesActiveTabUrl" : ""
					};

//Context menu handling
//createProperties for Context menu
var notesContextMenuProperties = { id : "notesContextMenu", title : "Add/Edit notes"};

//Add context menu to the browser
chrome.contextMenus.create(notesContextMenuProperties);

//Calback function when the user clicks the ContextMenu of the extension
function notesContextMenuCallback(notesContextMenuInfo, notesContextMenuTab) {
	alert("hello");
}
//End of Context menu handling

//Tab handling
//Callbck function called when Active Tab is changed
function notesActivatedTabCallback(notesActiveTabInfo) {
	notesActiveTab.notesActiveTabId = notesActiveTabInfo.tabId;
	chrome.tabs.get(notesActiveTab.notesActiveTabId, function(notesTabInfo) {
		notesActiveTab.notesActiveTabUrl = notesTabInfo.url;
	});
	chrome.browserAction.setBadgeText({"text" : notesActiveTab.notesActiveTabMsgCount});
}

//Callback function called when a tab is updated
function notesUpdatedTabCallback(notesTabId, notesTabChangeInfo, notesTabInfo) {
	if( (notesTabId == notesActiveTab.notesActiveTabId) && (typeof notesTabChangeInfo.url != "undefined") ) {
		notesActiveTab.notesActiveTabUrl = notesTabChangeInfo.url;
	}
}
//End of Tab handling


//Event listeners
//Register an event listener for Context menu
chrome.contextMenus.onClicked.addListener(notesContextMenuCallback);

//Register an event listener for Active Tabs
chrome.tabs.onActivated.addListener(notesActivatedTabCallback);

//Register an event listener for Updated Tabs
chrome.tabs.onUpdated.addListener(notesUpdatedTabCallback);
//End of Event listeners