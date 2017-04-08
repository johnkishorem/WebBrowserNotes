//Function to create an DOM with the provided message string
//<div class='msgbox'><span class='deletebtn'>&times;</span>msgString</div>
function notesCreateMsgBoxDom(msgString) {
	return "<div class='msgbox'><span class='deletebtn'>&times;</span>"+ msgString + "</div>";
}

$(function(){

	//Get elements from background script
	var notesMessageList = chrome.extension.getBackgroundPage().notesMessageListShare;
	//Add notes to the popup window
	for(var i =0; i < notesMessageList.length; i++) {
		//Add message to the notesMessage DOM div
		$("#notesMessages").append(notesCreateMsgBoxDom(notesMessageList[i]));
		//Add the position of message as data to the DOM element
		$("#notesMessages > .msgbox:last").data("notesListIndex",i.toString());
	}	

    //Add click listeners for delete button
	$(".deletebtn").click(function() {
		console.log($(this).parent().data("notesListIndex"));
	});

	$("form").submit(function(){
		console.log("Form submitted");
		return false;
	});
});