//Function to create an DOM with the provided message string
//<div class='msgbox'><span class='deletebtn'>&times;</span>msgString</div>
function notesCreateMsgBoxDom(msgString) {
	return "<div class='msgbox'><span class='deletebtn'>&times;</span>"+ msgString + "</div>";
}

$(function(){

	//Get elements from background script
	var notesMessageList = chrome.extension.getBackgroundPage().notesMessageListShare;
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
		notesMessageList.splice(i, 1);

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

			//Update the badge text
			chrome.browserAction.setBadgeText({"text" : notesMessageList.length.toString()});

			//Reload to the page to set all elements set again
			location.reload();
		}
		return false;
	});
});