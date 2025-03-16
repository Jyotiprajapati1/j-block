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

import { 
	InspectorControls,
	useBlockProps,
	BlockControls,
	AlignmentControl,
} from "@wordpress/block-editor";

import { Fragment } from "@wordpress/element";

import {
	PanelBody,
	RangeControl

} from "@wordpress/components";

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
export default function Edit( props ) {

	const { setAttributes, attributes } = props;
	const { numStar, textAlign  } = attributes;

	const StarIcon = () => {
		var starIcon 
		if( numStar == 1 ){
			starIcon = <><span>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span></>
		}
		
		if( numStar == 2 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span></>
		
		}

		if( numStar == 3 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span className='not-checked'>&#9733;</span><span className='not-checked'>&#9733;</span></>
		
		}

		if( numStar == 4 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span className='not-checked'>&#9733;</span></>
		
		}

		if( numStar == 5 ){
			starIcon = <><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></>
		
		}

		return starIcon;
	};


	return (
		<div { ...useBlockProps() }>
			<Fragment>
				<BlockControls>
					<AlignmentControl
						value={textAlign}
						onChange={ ( nextAlign ) => {
							setAttributes( { textAlign: nextAlign } );
						} }
					/>
				</BlockControls>
				<InspectorControls key="setting">
					<PanelBody>
						<RangeControl
							label={__("Number of Star", "experimental-block")}
							value={numStar}
							onChange={(value) => setAttributes({ numStar: value })}
							min={1}
							max={Math.max(5, numStar)}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>


			<div className="experimental-block-star-icon" style={ { textAlign: textAlign } }>
				<StarIcon />
			</div>

		</div>
	);
}