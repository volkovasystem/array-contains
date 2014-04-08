try{ var base = window; }catch( error ){ var base = exports; }
( function module( base ){
	define( "arrayContains",
		[
			"argumentsToArray"
		],
		function construct( ){
			/*
				Order of the parameters will be
					element, array, comparator

				If the first parameter is not an array then
					it is definitely the element to be compared.
			*/
			var arrayContains = function arrayContains( ){
				var parameters = argumentsToArray( arguments );

				var array;
				var element;
				var comparator;
				if( parameters[ 0 ] instanceof Array ){
					array = parameters[ 0 ];
				}else{
					element = parameters[ 0 ];
					array = parameters[ 1 ];
				}
				if( element === undefined
					&& array
					&& parameters.length == 2 )
				{
					comparator = parameters[ 1 ];
				}else if( parameters.length == 3 ){
					comparator = parameters[ 2 ];
				}


				if( !( array instanceof Array ) ){
					throw new Error( "invalid array" );
				}

				if( comparator 
					&& typeof comparator != "function" )
				{
					throw new Error( "invalid comparator function" )
				}

				comparator = comparator 
					|| function defaultComparator( thisElement, element ){
						return ( thisElement === element );
					};

				var arrayLength = array.length;
				for( var index = 0; index < arrayLength; index++ ){
					if( comparator( array[ index ], element ) ){
						return true;
					}
				}

				return false;
			};

			base.arrayContains = arrayContains;
		} );
} )( base );