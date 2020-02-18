$(document).ready(function () {
	/* Toggle dialog
    /*
    /*with jquery*/
    $('body').on('click','.topics-CTA', function(){
      $('#dialog1').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
      $('.topics-CTA').attr("disabled", "true")
    });

    $('body').on('click','.closebtn', function(){
      $('#dialog1').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
      $('.topics-CTA .intro-CTA').removeAttr("disabled")
    });

    $('body').on('click','.intro-CTA', function(){
      $('#dialog2').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
      $('.topics-CTA .intro-CTA').attr("disabled", "true")
    });

    $('body').on('click','.closebtn2', function(){
      $('#dialog2').toggleClass('showDialog hideDialog');
      $('#content').toggleClass('dimcontent');
      $('.topics-CTA .intro-CTA').removeAttr("disabled")
    });

//    console.log("some text")

} );
