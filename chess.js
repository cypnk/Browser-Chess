"use strict";

const
table	= document.createElement( 'table' ),
board	= [
	'87654321'.split(''),
	'abcdefgh'.split('')
], 
labels	= [],
pieces	= [ // Convention: [ HTML symbol, square location(s) ]
	{ h : '&#9812;', s : [ 'e1' ] },
	{ h : '&#9813;', s : [ 'd1' ] },
	{ h : '&#9814;', s : [ 'a1', 'h1' ] },
	{ h : '&#9815;', s : [ 'c1', 'f1' ] },
	{ h : '&#9816;', s : [ 'b1', 'g1' ] },
	{ h : '&#9817;', s : [ 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2' ] },
	{ h : '&#9818;', s : [ 'e8' ] },
	{ h : '&#9819;', s : [ 'd8' ] },
	{ h : '&#9820;', s : [ 'a8', 'h8' ] },
	{ h : '&#9821;', s : [ 'c8', 'f8' ] },
	{ h : '&#9822;', s : [ 'b8', 'g8' ] },
	{ h : '&#9823;', s : [ 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7' ] }
], 
find	= ( se, el, nl ) => { // HTML element locator helper
	el		= el || document;
	const qr	= el.querySelectorAll( se );
	
	if( nl && qr.length ) {
		return qr[0];
	}
	return qr;
};

// Variables
let 
acount	= 0,			// Selected square count
from	= null,			// Origin of a square before moving
ridx	= 1,			// Row index
lrow	= '<tr><th></th>',	// Row HTML prefix
crow	= '';			// Chess pieces row

// Letter header row
board[1].forEach( ( j ) => {
	lrow += '<th>' + j + '</th>';
} );
lrow	+= '<th></th></tr>';

// Piece rows
board[0].forEach( ( i ) => {
	let cidx = 1, lb = '';
	
	// Row index
	crow += '<tr><th>' + i + '</th>';
	
	board[1].forEach( ( j ) => {
		lb = j + '' + i;
		//labels.push( { "label" : lb, "pos" : [ ridx, cidx ] } );
		crow += '<td id="' + lb + '"></td>';
		cidx++;
	} );
	crow += '<th>' + i + '</th></tr>';
	ridx++;
} );

// Add the table
document.body.appendChild( table );
table.classList.add( 'bd' );
table.innerHTML = '<thead></thead><tbody></tbody><tfoot></tfoot>';

find( 'thead', table, 1 ).innerHTML = lrow;
find( 'tbody', table, 1 ).innerHTML = crow;
find( 'tfoot', table, 1 ).innerHTML = lrow;

// Insert pieces
pieces.forEach( ( p ) => {
	p['s'].forEach( ( i ) => {
		//console.log( i );
		find( '#' + i, table, 1 ).innerHTML = p['h']; 
	} );
} );

// Click behavior
const cells	= find( 'table.bd td' ), 
unselect	= () => {
	cells.forEach( ( el, i )  => {
		if ( el.classList.contains( 'active' ) ) {
			el.classList.remove( 'active' );
			acount--;
		}
	});
};

cells.forEach( ( el, i ) => {
	el.addEventListener( 'click', () => {
		if ( el.classList.contains( 'active' ) ) {
			el.classList.remove( 'active' );
			acount--;
		} else {
			el.classList.add( 'active' );
			acount++;
		}
		
		if ( acount >= 2 ) {
			if ( from ) {
				if ( from.innerHTML != '' ) {
					el.innerHTML	= from.innerHTML;
					from.innerHTML	= '';
				}
				from	= null;
			}
			unselect();
		} else {
			from = el;
		}
	});
});
