//Function to create an DOM with the provided message string
//<div class='msgbox'><span class='deletebtn'>&times;</span>msgString</div>
function notesCreateMsgBoxDom(msgString) {
	return "<div class='msgbox'><span class='deletebtn'>&times;</span>"+ msgString + "</div>";
}

$(function(){

	//Get elements from background script
	var notesMessageList = chrome.extension.getBackgroundPage().notesMessageListShare;

	//Get elements from storage if the list is empty
	if(notesMessageList.length == 0) {
		chrome.storage.local.get('notesChromeExtensionStorage', function(storedMessage) {
			if(storedMessage.notesChromeExtensionStorage != undefined) {
				// Read the value from the previously stored list
				notesMessageList = storedMessage.notesChromeExtensionStorage.split('\n');

				//Store the value here for background script and get during reload
				chrome.extension.getBackgroundPage().notesMessageListShare = notesMessageList;

				//Reload to set the DOM
				location.reload();
			}
		});
	}

	var i = 0;
	//Add notes to the popup window
	for(i =0; i < notesMessageList.length; i++) {
		//Add message to the notesMessage DOM div
		$("#notesMessages").append(notesCreateMsgBoxDom(notesMessageList[i]));
		//Add the position of message as data to the DOM element
		$("#notesMessages > .msgbox:last").data("notesListIndex",i.toString());
	}	

    //Add click listeners for delete button
	$(".deletebtn").click(function() {
		//Read data from DOM to identify index
		i = $(this).parent().data("notesListIndex");

		//Delete the notes from the list
		var tmpDeletedMessage = notesMessageList.splice(i, 1);

		//Store the value in local storage
		chrome.storage.local.set({'notesChromeExtensionStorage': notesMessageList}, function() {

		});

		//Update the badge text
		chrome.browserAction.setBadgeText({"text" : notesMessageList.length.toString()});		

		//Delete the notes from the DOM
		$(this).parent().remove();
		
	});

	//Add submit listener for add message
	$("form").submit(function(){
		var notesUserMessage = $("input:first").val();
		if(notesUserMessage != "") {

			// Push new notes into the array
			notesMessageList.push(notesUserMessage);

			//Store the value in local storage
			var tmpMessageForStorage = notesMessageList.join('\n');
			console.log(tmpMessageForStorage);
			chrome.storage.local.set({'notesChromeExtensionStorage': tmpMessageForStorage});			

			//Update the badge text
			chrome.browserAction.setBadgeText({"text" : notesMessageList.length.toString()});

			//Reload to the page to set all elements set again
			location.reload();	
		}
		return false;
	});
});