$( document ).ready( function () {
	var input = new OO.ui.TextInputWidget(),
		list = new OO.ui.SelectWidget();

	// Append to the wrapper
	$( '.wrapper' ).append(
		input.$element,
		list.$element
	);
  // Respond to 'enter' keypress
  input.on( 'enter', function () {
  	// Add the item
  	list.addItems( [
  		new OO.ui.OptionWidget( {
  			data: input.getValue(),
  			label: input.getValue()
  		} )
  	] );
  } );
} );
