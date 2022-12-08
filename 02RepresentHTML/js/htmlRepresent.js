import data from './nato.json' assert { type: 'json' };

/**
 * htmlRepresent
 * @autor: Jaime A. Mendez M.<jam65st@gmail.com>
 * @date: 20
 */

/**
 * ## setAttributes (arrow function)
 *
 * @param attributeList [{}] Attributes list to index in the element
 * @param element HTML Container who gets the attributes
 */
const setAttributes = ( attributeList, element ) =>
{
	// explore the attributeList from array | list
	for ( let i = 0; i < attributeList.length; i++ ){
		// accessing
		for ( let attr in attributeList[ i ] ){
			if ( attr === 'class' ) element.className += attributeList[ i ][ attr ]
			if ( attr === 'style' ) element.style.cssText += attributeList[ i ][ attr ]
			else element.setAttribute( attr, attributeList[ i ][ attr ] )
		}
	}
}

/**
 * ## ClassNode (arrow function)
 * Method to import an HTML structure and add their children
 *
 * @param data []  Data provider in assigned format
 * @param destinNode destin to add new items from kids.
 * @returns {*} populated element were
 * @constructor
 */
const ClassNode = ( data, destinNode ) =>
{
	// set of properties
	let node, // container for classNode element
	    tagName, text, children, attributeMap, // class node properties
	    element, textNode; // elements to aggregate
	
	// iterate into data array | list
	for ( let i = 0; i < data.length; i++ ){
		node         = data[ i ].classNode;  // get current node element
		tagName      = node.tagName || null; // get current element tag kind
		text         = node.text || null;  // get current text content
		children     = node.children || null; // get an array or list of childrens
		attributeMap = node.attributeMap || null; // get current element properties
		
		// Creating current node element using its tag, attributes and indexing text and childrens
		element = document.createElement( tagName );
		if ( attributeMap ) setAttributes( attributeMap, element );
		if ( text ){
			textNode = document.createTextNode( text );
			element.appendChild( textNode );
		}
		if ( children ) element = ClassNode( children, element );
		
		// put elements into their current destin
		destinNode.appendChild( element );
	}
	
	// return populated element
	return destinNode;
}

document.body.appendChild( ClassNode( data.body, document.getElementById( 'root' ) ) )