$(document).ready(function () {
	/* Toggle help pane
    var showHPBtn = document.querySelector('.helpPaneCTAbtn');
    var helpPane = document.querySelector('#helpPane');
    var hideHPBtn = document.querySelector('.closebtn');

    showHPBtn.addEventListener('click', function() {
    helpPane.classList.toggle('hideHPane'); helpPane.classList.toggle('showHPane');
    showHPBtn.classList.toggle('hideCTA');
    });

    hideHPBtn.addEventListener('click', function() {
    helpPane.classList.toggle('hideHPane'); helpPane.classList.toggle('showHPane');
    showHPBtn.classList.toggle('hideCTA');
    });

    /*
    /*with jquery*/
    $('body').on('click','.helpPaneCTAbtn', function(){
      $('#helpPane').toggleClass('showHPane');  $('#helpPane').toggleClass('hideHPane');
    });

    $('body').on('click','.closebtn', function(){
      $('#helpPane').toggleClass('showHPane');  $('#helpPane').toggleClass('hideHPane');
    });

    $('body').on('click','.gotoStep1', function(){
      $('#hp-step1').addClass('showHP-step');  $('#hp-step1').removeClass('hideHP-step');
      $('#hp-step2').removeClass('showHP-step');  $('#hp-step2').addClass('hideHP-step');
      $('#hp-step3').removeClass('showHP-step');  $('#hp-step3').addClass('hideHP-step');
    });

    $('body').on('click','.gotoStep2', function(){
      $('#hp-step2').addClass('showHP-step');  $('#hp-step2').removeClass('hideHP-step');
      $('#hp-step1').removeClass('showHP-step');  $('#hp-step1').addClass('hideHP-step');
      $('#hp-step3').removeClass('showHP-step');  $('#hp-step3').addClass('hideHP-step');
    });

    $('body').on('click','.gotoStep3', function(){
      $('#hp-step3').addClass('showHP-step');  $('#hp-step3').removeClass('hideHP-step');
      $('#hp-step1').removeClass('showHP-step');  $('#hp-step1').addClass('hideHP-step');
      $('#hp-step2').removeClass('showHP-step');  $('#hp-step2').addClass('hideHP-step');
    });

    console.log("some text")


//OOUI bits
var searchHelp = new OO.ui.SearchInputWidget({})

var searchHelpwLabel = new OO.ui.FieldsetLayout({
	id: '',
	label: '',
	items: [
    new OO.ui.FieldLayout( new OO.ui.SearchInputWidget( {
      placeholder: 'Search FAQs'
		} ), {
			align: 'top',
			label: ''
		} )
  ]
} )

var input1 = new OO.ui.TextInputWidget( {
    placeholder: 'Enter your question to the Help Desk here...'
} );

var multilineInput1 = new OO.ui.MultilineTextInputWidget( {
	rows: 3,
	autosize: true,
	placeholder: 'I’d like some help with...'
} )

var submit = new OO.ui.ButtonInputWidget( {
    label: 'Submit',
		flags: [
	'primary',
	'progressive'
],

} );

var fieldset = new OO.ui.FieldsetLayout( {
    label: ''
} );
fieldset.addItems( [
    new OO.ui.FieldLayout( multilineInput1, {
        label: '',
        align: 'top'
    } ),

    new OO.ui.FieldLayout( submit )
] );

var form1 = new OO.ui.FormLayout( {
    items: [ fieldset ],
    action: '/api/formhandler',
    method: 'get'
} )


	// Append to the wrapper
	$( '.searchFAQ' ).append( searchHelpwLabel.$element );
  $( '.AskQform' ).append( form1.$element );
} );
