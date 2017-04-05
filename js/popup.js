//Function to create an DOM with the provided message string
//<div class='msgbox'><span class='deletebtn'>&times;</span>msgString</div>
function notesCreateMsgBoxDom(msgString) {
	return "<div class='msgbox'><span class='deletebtn'>&times;</span>"+ msgString + "</div>";
}

$(function(){

	//Get elements from background script
	var notesMessageList = chrome.extension.getBackgroundPage().notesDevArray;
	//Add notes to the popup window
	for(var i =0; i < notesMessageList.length; i++) {
		$("#notesMessages").append(notesCreateMsgBoxDom(notesMessageList[i]));
		$("#notesMessages > .msgbox:last").data("notesListIndex",i.toString());
	}	

    //Add click listeners for delete button
	$(".deletebtn").click(function() {
		alert("Clicked");
	});
});