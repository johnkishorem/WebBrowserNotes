var notesBadgeString = { text: "0"};
chrome.browserAction.setBadgeText(notesBadgeString);

//Context menu handling
//createProperties for Context menu
var notesContextMenuProperties = { id : "notesContextMenu", title : "Add/Edit notes"};

//Add context menu to the browser
chrome.contextMenus.create(notesContextMenuProperties);

//Register an event listener for Context menu
chrome.contextMenus.onClicked.addListener(notesContextMenuCallback);
//End of Context menu handling

//User event handler function - This function is called 
//when the user clicks the ContextMenu of the extension
function notesContextMenuCallback(notesContextMenuInfo, notesContextMenuTab) {
	alert("hello");
}