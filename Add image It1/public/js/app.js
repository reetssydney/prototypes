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
	if (page === 'start.html') {
		$('a').attr("href", `/edit.html#${hash}`);
	} else if (page === 'edit.html') {
		$('a').attr("href", `/publish.html#${hash}`);
	} else if (page === 'publish.html') {
		$('a').attr("href", `/review.html#${hash}`);
	} else if (page === 'review.html') {
		$('a').attr("href", `/start.html#${obj.nextTitle}`);
	}
}

$(document).ready(function() {

	getLocation();

});


/*/◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊//
//••••••••••••••••••••••••••  B I G  H E A D E R  ••••••••••••••••••••••••••//
//◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊◊/*/


/**** S M A L L  H E A D E R ****/
