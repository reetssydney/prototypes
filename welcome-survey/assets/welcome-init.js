$( document ).ready( function () {
// DropdownInputWidget 1
var dropdownInput1 = new OO.ui.DropdownInputWidget( {
    options: [
        { data: 'a', label: 'Please select...' },
        { data: 'b', label: 'To fix a typo or error in a Wikipedia article'},
        { data: 'c', label: 'To add information to a Wikipedia article '},
        { data: 'd', label: 'To create a new Wikipedia article ' },
				{ data: 'e', label: 'To read Wikipedia' },
				{ data: 'f', label: 'Other (please describe)' }
    ]
} );
var dropdownInput2 = new OO.ui.DropdownInputWidget( {
    options: [
			{ data: 'a', label: 'Please select...' },
			{ data: 'b', label: 'Yes, many times'},
			{ data: 'c', label: ' Yes, once or twice' },
			{ data: 'd', label: 'No, I didn\'t know I could edit Wikipedia' },
			{ data: 'e', label: ' No, for other reasons ' },
			{ data: 'f', label: 'I don\'t remember' }
	]
} );

var multiselectInput1 = new OO.ui.CheckboxMultiselectInputWidget( {
    options: [
        { data: 'a', label: 'Arts' },
        { data: 'b', label: 'Science'},
				{ data: 'c', label: 'Geography' },
        { data: 'd', label: 'History'},
				{ data: 'e', label: 'Music' },
        { data: 'f', label: 'Sort'},
				{ data: 'g', label: 'Literature' },
        { data: 'h', label: 'Religion'},
        { data: 'i', label: 'Popular culture' }
    ]
} );

var widget = new OO.ui.MenuTagMultiselectWidget( {
	placeholder: 'Add more topics...',
	allowArbitrary: true,
    options: [
       { data: 'option1', label: 'Entertainment'},
       { data: 'option2', label: 'Food and drink' },
       { data: 'option3', label: 'Biography' },
			 { data: 'option4', label: 'Military'},
       { data: 'option5', label: 'Economics' },
       { data: 'option6', label: 'Technology' },
			 { data: 'option7', label: 'Film'},
       { data: 'option8', label: 'Philosophy' },
       { data: 'option9', label: 'Business' },
			 { data: 'option10', label: 'Politics'},
       { data: 'option11', label: 'Government' },
       { data: 'option12', label: 'Engineering' },
			 { data: 'option13', label: 'Crafts and hobbies'},
       { data: 'option14', label: 'Games' },
       { data: 'option15', label: 'Health' },
			 { data: 'option16', label: 'Social science' },
			 { data: 'option17', label: 'Transportation' },
			 { data: 'option18', label: 'Education' },
    ],
} );


var input1 = new OO.ui.TextInputWidget( {
    placeholder: 'Enter your email address'
} );

var submit = new OO.ui.ButtonInputWidget( {
    label: 'Submit',
		flags: [
	'primary',
	'progressive'
],

} );

var fieldset = new OO.ui.FieldsetLayout( {
    label: 'Help us make Wikipedia better for our new users by answering a few optional questions.' //leave h3 blank
} );
fieldset.addItems( [
    new OO.ui.FieldLayout( dropdownInput1, {
        label: 'Why did you create your account today?',
        align: 'top'
    } ),
    new OO.ui.FieldLayout( dropdownInput2, {
        label: 'Have you ever edited Wikipedia?',
        align: 'top'
    } ),
		new OO.ui.FieldLayout( multiselectInput1, {
        label: 'People can edit Wikipedia articles on topics that they care about. We’ve listed a few topics below that are popular for editing. Select some topics that you may wish to edit:',
        align: 'top'
    } ),
		new OO.ui.FieldLayout( widget, {
        label: '',
        align: 'top'
    } ),
		new OO.ui.FieldLayout( input1, {
			align: 'top',
			helpInline: true,
        label: 'Email address (optional)',
				help: 'We noticed you didn\’t enter an email when creating this account. It\’s highly recommended, since an email is needed for account recovery if you ever lose your password. NOTE: Your email address is not revealed when other users contact you.'
    } ),

		new OO.ui.LabelWidget( {
			label: new OO.ui.HtmlSnippet( '<br/>We are considering starting a program for more experienced editors to help newer users with editing. Are you interested in being contacted to get help with editing?' )
		} ),

		new OO.ui.FieldLayout( new OO.ui.CheckboxInputWidget( {
			name: 'iminterested',
			selected: false
		} ), {
			align: 'inline',
			label: 'Yes I\'m interested'
		} ),

    new OO.ui.FieldLayout( submit )
] );
var form = new OO.ui.FormLayout( {
    items: [ fieldset ],
    action: '/api/formhandler',
    method: 'get'
} )


	// Append to the wrapper
	$( '.welcome-Q1' ).append( form.$element );
} );
