$(document).ready(function () {
	/* Toggle dialog
    /*
    /*with jquery*/
    $('body').on('click','.topics-CTA', function(){
      $('#dialog').toggleClass('showDialog');  $('#dialog').toggleClass('hideDialog');
      $('#content').toggleClass('dimcontent');
    });

    $('body').on('click','.closebtn', function(){
      $('#dialog').toggleClass('showDialog');  $('#dialog').toggleClass('hideDialog');
      $('#content').toggleClass('dimcontent');
    });

//    console.log("some text")

} );
