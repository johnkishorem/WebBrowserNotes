//Array of messages for dev purpose
var notesDevArray = ["No notes to display", "No notes to display"];


//Function to create an DOM with the provided message string
//<div class='msgbox'><span class='deletebtn'>&times;</span>msgString</div>
function notesCreateMsgBoxDom(msgString) {
	return "<div class='msgbox'><span class='deletebtn'>&times;</span>"+ msgString + "</div>";
}

$(function(){

	//Add notes to the popup window
	for(var i =0; i < notesDevArray.length; i++) {
		$('#notesMessages').append(notesCreateMsgBoxDom(notesDevArray[i]))
	}	

    //Add click listeners for delete button
	$(".deletebtn").click(function() {
		alert("Clicked");
	});	
});
