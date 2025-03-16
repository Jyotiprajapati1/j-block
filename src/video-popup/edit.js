/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls, AlignmentControl, PanelColorSettings } from '@wordpress/block-editor';
import { RangeControl, PanelBody, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( props ) {

	const { setAttributes, attributes } = props;
	const { blockId, videoCode, iconColor, fontSize  } = attributes;

	const strRandom = () => {
		var result = '';
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var length = 10;
		
		// Loop to generate characters for the specified length
		for (let i = 0; i < length; i++) {
			const randomInd = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomInd);
		}
		return result;
	}

	if (!blockId) {
        setAttributes({ blockId: strRandom() });
    }

	const iconColorSettings = [
		{
			value: iconColor,
			onChange: colorValue => setAttributes({ iconColor: colorValue }),
			label: __( "Icon Color", 'experimental-blocks' )
		}
	];

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'Video Button Options', 'experimental-blocks' ) } >
					<TextControl
						label={__("Youtube Video code", "experimental-block")}
						value={ videoCode }
						onChange={ ( value ) => setAttributes( { videoCode: value } ) }
					/>
					<RangeControl
						label={__('Font Size', 'experimental-blocks')}
						onChange={ (value) => setAttributes( { fontSize: value } ) }
						shiftStep={ 1 }
						min={ 2 }
						max={ 100 }
						value={ fontSize }
					/>
				</PanelBody>
				<PanelColorSettings
					title={__('Icon Color', 'experimental-blocks')}
					colorSettings={iconColorSettings}
					initialOpen={false}
				/>
			</InspectorControls>
			<ServerSideRender
				block="experimental-block/video-popup"
				attributes={ props.attributes }
			/>
		</div>
	);
}
