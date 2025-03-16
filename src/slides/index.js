/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
 import { registerBlockType } from '@wordpress/blocks';
 import { __ } from "@wordpress/i18n";

 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
 import "./editor.scss";

 
import metadata from './block.json';

 
 /**
  * Every block starts by registering a new block type definition.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
  */

 const icon = wp.element.createElement(
    'svg',
    {
      width: "800px",
      height: "800px",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    wp.element.createElement('rect', {
      x: "3",
      y: "4",
      width: "18",
      height: "16",
      stroke: "black",
      fill: "none",
      strokeWidth: "1"
    }),
    wp.element.createElement('rect', {
      x: "3",
      y: "4",
      width: "18",
      height: "3",
      fill: "black"
    }),
    wp.element.createElement('line', {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10",
      stroke: "black",
      strokeWidth: "1"
    }),
    wp.element.createElement('rect', {
      x: "3",
      y: "11",
      width: "18",
      height: "8",
      fill: "none",
      stroke: "black",
      strokeWidth: "1"
    })
  );
  

 registerBlockType( metadata.name, {
    icon,
	edit: ({
        attributes: {
            templateLock = false,
            allowedBlocks,
        },
        setAttributes,
        clientId,
    } ) => {

        const classes = classnames( 'splide__slide', {
        } );

        const blockProps = useBlockProps( {
            className: classes,
        } );

        const { columnsIds, hasChildBlocks, rootClientId } = useSelect(
            ( select ) => {
                const { getBlockOrder, getBlockRootClientId } = select(
                    blockEditorStore
                );
    
                const rootId = getBlockRootClientId( clientId );
    
                return {
                    hasChildBlocks: getBlockOrder( clientId ).length > 0,
                    rootClientId: rootId,
                    columnsIds: getBlockOrder( rootId ),
                };
            },
            [ clientId ]
        );

        const innerBlocksProps = useInnerBlocksProps(
            { ...blockProps },
            {
                templateLock,
                allowedBlocks,
                renderAppender: hasChildBlocks
                    ? undefined
                    : InnerBlocks.ButtonBlockAppender,
            }
        );
         return (
            <li { ...innerBlocksProps } />
         );
     },
 
	  save: () => {
        
        const classes = classnames('splide__slide');
        const blockProps = useBlockProps.save( {
            className: classes, 
        } );
        const innerBlocksProps = useInnerBlocksProps.save( blockProps );
    
        return <li { ...innerBlocksProps } />;
    },
 } );
