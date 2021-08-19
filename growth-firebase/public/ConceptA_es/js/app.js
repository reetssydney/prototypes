// figure out which page and which data to create
function getLocation() {
	var page = window.location.pathname.substring(1);
	var hash = window.location.hash.substring(1);
	updateHtml(page, hash);
}

function isPage(currentPage, targetPage) {
	return currentPage.indexOf(targetPage) !== -1;
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
	if (isPage(page, 'newcomer_homepage')) {
		$('a#openSE').attr("href", `suggested_edits.html#${hash}`);

	} else if (isPage(page, 'suggested_edits')) {
		$('a#backHome').attr("href", `newcomer_homepage.html#${hash}`);
		$('a#edit').attr("href", `edit.html#${hash}`);

	} else if (isPage(page, 'edit')) {
		$('a#next').attr("href", `preview.html#${hash}`);
		$('a#no').attr("href", `reject.html#${hash}`);
		$('a#close').attr("href", `suggested_edits.html#${hash}`);
		$('a#openFilepage').attr("href", `image-filepage.html#${hash}`);
		setSuggestionAccepted();

	} else if (isPage(page, 'reject')) {
		$('a#back').attr("href", `edit.html#${hash}`);
		$('a#done').attr("href", `preview.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);
		setSuggestionRejected();
	} else if (isPage(page, 'preview')) {
		$('a#back').attr("href", `edit.html#${hash}`);
		$('a#done').attr("href", `submitted.html#${hash}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`); //not needed in Concept A
		if ( getAcceptance() === 'rejected' ) {
			$('#imgCaption').addClass('rejected');
			$('#imgName')
				.addClass('rejected')
				.before('<p class="rejection-article-title">' + obj.title + ':</p>');
			$('#imgFile').addClass('rejected');
		}

	} else if (isPage(page, 'submitted')) {
		$('a#nextEdit').attr("href", `edit.html#${obj.nextTitleID}`);
		$('a#nextSE').attr("href", `suggested_edits.html#${obj.nextTitleID}`);
		$('#imgCaption').html(`${localStorage.getItem(hash)}`);

	} else if (isPage(page, 'fullscreen-image')) {  //can be removed since fullscreen image moved into edit page//
			$('a#closeFullscreen').attr("href", `edit.html#${hash}`);
			$('a#closeFullscreenImg').attr("href", `edit.html#${hash}`);
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
		$('.header-caption').removeClass('hidden');
		$('.header-loading').addClass('hidden');
		promise.resolve();
	}, 800);

	return promise;
}

function updateCaptionNav() {
	$('#close').addClass('hidden');
	$('.back-caption').removeClass('hidden');
}

function hideCaptionInput() {
	$('.ButtonOverImage').addClass('hidden');
	$('.overImage').addClass('hidden');
	$('#bottom-sheet').css('bottom', 0).show();
	$('#next').addClass('hide');
	$('.header-caption').addClass('hidden');
	$('.header-suggestions').removeClass('hidden');
	$('.back-caption').addClass('hidden');
	$('#close').removeClass('hidden');
}

function showCaptionInput() {
	updateCaptionNav();
	$('.ButtonOverImage').removeClass('hidden');
	$('.overImage').removeClass('hidden');
	$('#caption-input').focus();
	$('#bottom-sheet').hide();
	$('#next').removeClass('hide');
}

// move image and add input
function handleImageSelection() {
	$('.ButtonOverImage').prepend(
		$('#imageThumb img').addClass('placedImage').clone(),
		$('#imgDescription_repeat').addClass('placedImage'),
	);

	showImageLoadingState().then(() => {
		showCaptionInput();
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
	updateHtml('suggested_edits', title);
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
