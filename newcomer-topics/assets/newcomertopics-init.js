$(document).ready(function () {
	/* Toggle dialog
    /*
    /*with jquery*/
    $('body').on('click','.topics-CTA', function(){
      $('#dialog1').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
    });

    $('body').on('click','.closebtn', function(){
      $('#dialog1').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
    });

    $('body').on('click','.intro-CTA', function(){
      $('#dialog2').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
    });

    $('body').on('click','.closebtn2', function(){
      $('#dialog2').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
    });

//    console.log("some text")

} );
