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
	if (page === 'ConceptB/newcomer_homepage.html') {
		$('a#openSE').attr("href", `/ConceptB/suggested_edits.html#${hash}`);
	} else if (page === 'ConceptB/suggested_edits.html') {
		$('a#backHome').attr("href", `/ConceptB/newcomer_homepage.html#${hash}`);
		$('a#edit').attr("href", `/ConceptB/edit.html#${hash}`);
	} else if (page === 'ConceptB/edit.html') {
		$('a#next').attr("href", `/ConceptB/preview.html#${hash}`);
		$('a#no').attr("href", `/ConceptB/reject.html#${hash}`);
		$('a#close').attr("href", `/ConceptB/suggested_edits.html#${hash}`);
		$('a#openFullscreenImg').attr("href", `/ConceptB/fullscreen-image.html#${hash}`);
		$('a#openFilepage').attr("href", `/ConceptB/image-filepage.html#${hash}`);
	} else if (page === 'ConceptB/reject.html') {
		$('a#back').attr("href", `/ConceptB/edit.html#${hash}`);
		$('a#done').attr("href", `/ConceptB/submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'ConceptB/preview.html') {
		$('a#back').attr("href", `/ConceptB/edit.html#${hash}`);
		$('a#done').attr("href", `/ConceptB/submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'ConceptB/submitted.html') {
		$('a#nextEdit').attr("href", `/ConceptB/edit.html#${obj.nextTitleID}`);
		$('a#nextSE').attr("href", `/ConceptB/suggested_edits.html#${obj.nextTitleID}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
	} else if (page === 'ConceptB/fullscreen-image.html') {
			$('a#closeFullscreen').attr("href", `/ConceptB/edit.html#${hash}`);
			$('a#closeFullscreenImg').attr("href", `/ConceptB/edit.html#${hash}`);
		}
}

function showCaptionGuidance() {
	if (typeof window.showCaptionOnboarding === 'function') {
		showCaptionOnboarding();
	}
}

function showImageLoadingState() {
	const promise = $.Deferred();
	$('html, body').animate({ scrollTop: 0 });
	$('#bottom-sheet').css('bottom', '-100%');
	$('.header-suggestions').addClass('hidden');
	$('.header-loading').removeClass('hidden');

	setTimeout(function() {
		$('.placedImage-loading').addClass('transparent');
		$('.header-suggestions').text(getMessage('header-add-caption')).removeClass('hidden');
		$('.header-loading').addClass('hidden');
		promise.resolve();
	}, 800);

	return promise;
}

// move image and add input
function handleImageSelection() {
	$('.ButtonOverImage').prepend(
		$('#imgFile img').addClass('placedImage')
	);

	showImageLoadingState().then(() => {
		$('.overImage').removeClass('hidden');
		$('#caption-input').focus();
		$('#bottom-sheet').hide();
		$('#next').removeClass('hide');
		showCaptionGuidance();
	});
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
	$('#expand-collapse').toggleClass('collapsed');
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

function animateClass(className) {
  setTimeout(() => {
    $('.' + className).removeClass(className + '-pre').addClass(className + '-ready');
  }, 500);
}

$(document).ready(function() {

	getLocation();

});
