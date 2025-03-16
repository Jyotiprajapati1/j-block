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
 registerBlockType( metadata.name, {

	 edit: ({
        setAttributes,
        clientId,
    } ) => {

        const classes = classnames( 'experimental-block-testimonial-item', {
        } );

        const blockProps = useBlockProps( {
            className: classes,
            style: { textAlign: 'center' },
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

        const allowedBlocks = ['core/paragraph', 'core/heading', 'core/image'];

        const template = [
            ['core/group', { style: { 
                color: { background: 'rgb(249 249 249)' },
                spacing: { padding: { top: '20px', right: '20px', bottom: '20px', left: '20px' } },
                border: { 
                    color: '#CACACA', 
                    width: '1px', 
                    style: 'solid' 
                }
            }  }, [
                ['core/image', {
                    sizeSlug: 'medium',
                    width: '200px',
                    height: '200px',
                    align: 'center',
                    scale: 'cover',
                    style: { 
                        border: { radius: '50%' },
                        objectFit: 'cover',
                        objectPosition: 'center center'              
                    }
                }],
                ['core/paragraph', { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet est massa. Sed enim massa, mattis at libero nec, bibendum ultricies augue.', align: 'center' }],
                ['core/heading', { content: 'John Leo', textAlign: 'center', style: { typography: { fontSize: '30px' } } }],
                ['core/heading', { content: 'Founder - CEO', textAlign: 'center', level: 4, style: { typography: { fontSize: '18px', fontWeight: '500'  } } }],
                ['experimental-block/star-icon', { 
                    textAlign: 'center',
                    style: { 
                        typography: { fontSize: '22px' }
                    }
                }],
            ]]
        ];
        const innerBlocksProps = useInnerBlocksProps(
            { ...blockProps },
            {
                template,
                allowedBlocks
            }
        );
         return (
            <div { ...innerBlocksProps } />
         );
     },
 
	  save: () => {
        
        const classes = classnames('experimental-block-testimonial-item');
        const blockProps = useBlockProps.save( {
            className: classes, 
        } );
        const innerBlocksProps = useInnerBlocksProps.save( blockProps );
    
        return <div { ...innerBlocksProps } />;
    },
 } );
