//Global Information storage
var notesActiveTab = {"notesActiveTabId" : chrome.tabs.TAB_ID_NONE, 
						"notesActiveTabMsgCount" : "0",
						"notesActiveTabUrl" : ""
					};

//Share variables handling
//Variables to be shared with event script
var notesMessageListShare = ["No notes to display"];

function notesUpdateMessageList(messageStored) {
	var tmpMessageListArray = messageStored.split('\n');

	//Remove the last array element as it is empty after the split
	tmpMessageListArray.pop();

	//Remove all the elements from the list
	for(var i = 0; i < notesMessageListShare.length; i++) {
		notesMessageListShare.pop();
	}
	
	//Add new elements to the list
	for(var i = 0; i < tmpMessageListArray.length; i++) {
		notesMessageListShare.push(tmpMessageListArray[i]);
	}
}

//End of share variables handling

//Dev array to use untill storage is implemented
var notesDevArray = [
                     "List item 1 of 1\nList item 2 of 1\nList item 3 of 1\n",
                     "List item 1 of 2\nList item 2 of 2\nList item 3 of 2\n",
                     "List item 1 of 3\nList item 2 of 3\nList item 3 of 3\n",
                    ];

//Context menu handling
//createProperties for Context menu
var notesContextMenuProperties = { id : "notesContextMenu", title : "Add/Edit notes"};

//Add context menu to the browser
chrome.contextMenus.create(notesContextMenuProperties);

//Calback function when the user clicks the ContextMenu of the extension
function notesContextMenuCallback(notesContextMenuInfo, notesContextMenuTab) {
	notesUpdateMessageList(notesDevArray[0]);
}
//End of Context menu handling

//Tab handling
//Callbck function called when Active Tab is changed
function notesActivatedTabCallback(notesActiveTabInfo) {
	notesActiveTab.notesActiveTabId = notesActiveTabInfo.tabId;
	chrome.tabs.get(notesActiveTab.notesActiveTabId, 
		function(notesTabInfo) {
			notesActiveTab.notesActiveTabUrl = notesTabInfo.url;
		}
	);
	chrome.browserAction.setBadgeText({"text" : notesActiveTab.notesActiveTabId.toString()});
}

//Callback function called when a tab is updated
function notesUpdatedTabCallback(notesTabId, notesTabChangeInfo, notesTabInfo) {
	if( (notesTabId == notesActiveTab.notesActiveTabId) 
		&& (typeof notesTabChangeInfo.url != "undefined") ) {
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