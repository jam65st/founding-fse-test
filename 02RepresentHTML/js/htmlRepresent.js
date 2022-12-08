import data from './nato.json' assert {type: 'json'};

const ClassNode = (data, where) => {
    let node, tagName, text, children, attributeMap, element;

    const setAttributes = ( list, elem ) => {
        for ( let i=0; i< list.length; i++ ){
            for ( let attr in list[i] ){
                // console.log( 'attr', attr, list[i][attr] )
                if( attr == 'class' ) elem.className += list[i][attr]
                else elem.setAttribute( attr, list[i][attr] )
            }
        }
    }

    console.log( 'type', typeof data, Array.isArray(data), data.length )

    for ( let i=0; i< data.length; i++ ) {
        node    =  data[i].classNode;
        tagName = node.tagName || null;
        text = node.text || null;
        children = node.children || null;
        attributeMap = node.attributeMap || null;

        element = where.createElement(tagName);
        if( text ) where.createTextNode(text);
        if( attributeMap ) setAttributes( attributeMap, element )

        console.log( 'node', i, tagName, text, children, attributeMap )
        console.log( '*', element )
    }
}

const webHtml = ClassNode( data.body, document );

// document.body.appendChild( ClassNode( data.body ) )