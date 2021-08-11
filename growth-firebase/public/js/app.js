// figure out which page and which data to create
function getLocation() {
	var page = window.location.pathname.substring(1);
	var hash = window.location.hash.substring(1);
	updateHtml(page, hash);
}

// add the appropriate data to the page
function updateHtml(page, hash) {
	// get the appropriate object
	var obj = window[hash];
	// get the keys from that object
	var keys = Object.keys(obj);
	// for each key
	for (const element of keys) {
		// check if an element with that id exists
		if ( document.getElementById(`${element}`) ) {
			// if it does, update its HTML with data from the object
			$(`#${element}`).html(obj[element]);
		}
	}
	// add the buttons which are page dependent
	if (page === 'newcomer_homepage.html') {
		$('a#openSE').attr("href", `/suggested_edits.html#${hash}`);
	} else if (page === 'suggested_edits.html') {
		$('a#edit').attr("href", `/edit.html#${hash}`);
	} else if (page === 'edit.html') {
		$('a#next').attr("href", `/preview.html#${hash}`);
		$('a#no').attr("href", `/reject.html#${hash}`);
		$('a#close').attr("href", `/suggested_edits.html#${hash}`);
	} else if (page === 'reject.html') {
		$('a#back').attr("href", `/edit.html#${hash}`);
		$('a#done').attr("href", `/submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'preview.html') {
		$('a').attr("href", `/submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'submitted.html') {
		$('a#nextEdit').attr("href", `/edit.html#${obj.nextTitleID}`);
		$('a#nextSE').attr("href", `/suggested_edits.html#${obj.nextTitleID}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'fullscreen-image.html') {
			$('a#closeFullscreen').attr("href", `/edit.html#${hash}`);
		}
}

// move image and add input
function handleImageSelection() {
	$('.ButtonOverImage').prepend(
		$('#imgFile img').addClass('placedImage')
	);
	$('.overImage').prepend(
		'<img src="img/icon/robot.svg" width="16px" height="16px" class="margin8left" /><p id="caption">Add caption below</p><img id="openPopUp2" src="img/icon/info-inverse.svg" /><textarea id="caption-input" placeholder="Write a short caption here to help explain why the image is relevant to the article..." oninput="checkInput()"></textarea>'
	);
	$('#caption-input').focus();
	$('#bottom-sheet').hide();
	$('#next').removeClass('hide');
}

// add comment to local storage
function handleAddComment() {
	var hash = window.location.hash.substring(1);
	var val = $('#caption-input').val();
	localStorage.setItem(hash, val);
}

// prev/next buttons on homepage
function handleTraverseSuggestions(str) {
	var hash = window.location.hash.substring(1);
	var title = window[hash][str];
	window.location.replace(`suggested_edits.html#${title}`);
	updateHtml('suggested_edits.html', title);
}

// show/hide the bottom image suggestion 'inspector' panel
function handleToggleInspector() {
	$('#bottom-sheet').toggleClass('minimise');
}

// check if there is any text in the textarea
function checkInput() {
	target = $(event.target);
	// if there is text
	if ( $(target).val() ) {
		// remove the disabled class on the next button
		$('#next button').removeClass('disabled');
	} else {
		$('#next button').addClass('disabled');
	}
}

$(document).ready(function() {

	getLocation();

});


// Pop-up drawer style
// Get the drawer
var drawer = document.getElementById("PopUp_Drawer");

// Get the button that opens the drawer
var popUpBtn = document.getElementById("openPopUp");

// Get the <span> element that closes the drawer
var span = document.getElementsByClassName("closeDrawer")[0];

// When the user clicks on the button, open the drawer
popUpBtn.onclick = function() {
  drawer.style.display = "block";
	$('.ButtonOverImage').addClass('ImgSelected');
	$('#captionHelperInfo').append(
		$('#imgName'),
		$('#imgDescription'),
		$('#imgCommonsCaption'),
		$('#imgDate'),
		$('#imgCommonsCategories'),
	);
}

// When the user clicks on <span> (x), close the drawer
span.onclick = function() {
  drawer.style.display = "none";
	$('.ButtonOverImage').removeClass('ImgSelected');
	$('#caption-input').focus();
}

// When the user clicks anywhere outside of the drawer, close it
window.onclick = function(event) {
  if (event.target == drawer) {
    drawer.style.display = "none";
  }
}


// Pop-up MODAL style
// Get the modal
var modal = document.getElementById("PopUp_Modal");

// Get the button that opens the modal
var moreBtn = document.getElementById("openPopUpModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

// When the user clicks on the button, open the modal

moreBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == drawer) {
    modal.style.display = "none";
  }
}
