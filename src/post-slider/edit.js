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
	BlockControls,
	AlignmentControl,
	useBlockProps,
} from "@wordpress/block-editor";

import { Fragment, useState } from "@wordpress/element";

import {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalBorderBoxControl as BorderBoxControl

} from "@wordpress/components";

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

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

import GridDesignOne from './layout/grid/GridDesignOne';
import GridDesignTwo from './layout/grid/GridDesignTwo';
import GridDesignThree from './layout/grid/GridDesignThree';
import ListDesignOne from './layout/list/ListDesignOne';
import ListDesignTwo from './layout/list/ListDesignTwo';
import ListDesignThree from './layout/list/ListDesignThree';

// Create a mapping of possible components
const componentMap = {
	ListDesignOne,
	ListDesignTwo,
	ListDesignThree,
	GridDesignOne,
	GridDesignTwo,
	GridDesignThree,
};
export default function Edit(props) {

	const { setAttributes, attributes } = props;
	const { titleFontSize, wordlimit, imageHeight, blockId, contentType, containerHeight, showThumbnail, postIds, categoryIds, numPosts, speed, perPage, autoPlay, showDots, showArrow, pauseHover, design, showAuthor, showDate, showExcert, layout } = attributes;

	const strRandom = () => {
		var result = '';
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var length = 10;

		for (let i = 0; i < length; i++) {
			const randomInd = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomInd);
		}
		return result;
	}

	if (!blockId) {
		setAttributes({ blockId: strRandom() });
	}

	const toCapitalCase = (str) => {
		return str
			.toLowerCase() // Convert the entire string to lowercase first
			.split(' ')    // Split the string into an array of words
			.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
			.join(' ');    // Join the words back into a single string
	}

	// Create the dynamic component name
	const componentName = `${toCapitalCase(layout)}Design${toCapitalCase(design)}`;
	const ComponentToRender = componentMap[componentName]; // Get the component from the map

	const getStyles = () => ({
		'--image-height': `${imageHeight}px`,
		'--title-font-size': `${titleFontSize}px`,
	})

	return (
		<div {...useBlockProps()}>
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Content Settings', 'experimental-block')} initialOpen={false}>
						<SelectControl
							label="Content Type"
							value={contentType}
							options={[
								{ label: 'Recent', value: 'recent' },
								{ label: 'Post Ids', value: 'post-ids' },
								{ label: 'Category Ids', value: 'category-ids' },
							]}
							onChange={(value) => {
								setAttributes({ contentType: value });
							}}
						/>
						{
							contentType == 'post-ids' &&
							<TextControl
								label={__('Post Ids', 'experimental-block')}
								value={postIds}
								onChange={(value) => setAttributes({ postIds: value })}
							/>
						}
						{
							contentType == 'category-ids' &&
							<TextControl
								label={__('Category Ids', 'experimental-block')}
								value={categoryIds}
								onChange={(value) => setAttributes({ categoryIds: value })}
							/>
						}
						{
							contentType == 'recent' &&
							<RangeControl
								label={__("Number of Posts", "experimental-block")}
								value={numPosts}
								onChange={(value) => setAttributes({ numPosts: value })}
								min={2}
								max={Math.max(10, numPosts)}
							/>
						}
						<RangeControl
									label={__("Title Font Size", "experimental-block")}
									value={titleFontSize}
									onChange={(value) => setAttributes({ titleFontSize: value })}
									min={5}
									max={50}
								/>
						{
							(layout === 'list' && showThumbnail) && (
								<RangeControl
									label={__("Image Height", "experimental-block")}
									value={imageHeight}
									onChange={(value) => setAttributes({ imageHeight: value })}
									min={10}
									max={1000}
								/>
							)
						}
						{
							(layout === 'list' && showExcert) && (
								<RangeControl
									label={__("Excert word Count", "experimental-block")}
									value={wordlimit}
									onChange={(value) => setAttributes({ wordlimit: value })}
									min={5}
									max={200}
								/>
							)
						}

						<ToggleControl
							label={__('Show Thumbnail', 'experimental-block')}
							checked={showThumbnail}
							onChange={() => setAttributes({ showThumbnail: !showThumbnail })}
						/>
						<ToggleControl
							label={__('Show Post Author', 'experimental-block')}
							checked={showAuthor}
							onChange={() => setAttributes({ showAuthor: !showAuthor })}
						/>

						<ToggleControl
							label={__('Show Posted Date', 'experimental-block')}
							checked={showDate}
							onChange={() => setAttributes({ showDate: !showDate })}
						/>
						<ToggleControl
							label={__('Show Excert', 'experimental-block')}
							checked={showExcert}
							onChange={() => setAttributes({ showExcert: !showExcert })}
						/>
						<SelectControl
							label={__('Select Layout', 'experimental-block')}
							value={layout}
							options={[
								{ label: __('List', 'experimental-block'), value: 'list' },
								{ label: __('Grid', 'experimental-block'), value: 'grid' }
							]}
							onChange={(val) => setAttributes({ layout: val })}
						/>
						<SelectControl
							label={__('Select Design', 'experimental-block')}
							value={design}
							options={[
								{ label: __('Design One', 'experimental-block'), value: 'one' },
								{ label: __('Design Two', 'experimental-block'), value: 'two' },
								{ label: __('Design Three', 'experimental-block'), value: 'three' }
							]}
							onChange={(val) => setAttributes({ design: val })}
						/>


					</PanelBody>
					<PanelBody title={__('Slider Settings', 'experimental-block')} initialOpen={false}>
						<ToggleControl
							label={__('Auto Play', 'experimental-block')}
							checked={autoPlay}
							onChange={() => setAttributes({ autoPlay: !autoPlay })}
						/>
						<ToggleControl
							label={__('Show Dots', 'experimental-block')}
							checked={showDots}
							onChange={() => setAttributes({ showDots: !showDots })}
						/>
						<ToggleControl
							label={__('Show Arrow', 'experimental-block')}
							checked={showArrow}
							onChange={() => setAttributes({ showArrow: !showArrow })}
						/>
						<ToggleControl
							label={__('Pause On Hover', 'experimental-block')}
							checked={pauseHover}
							onChange={() => setAttributes({ pauseHover: !pauseHover })}
						/>
						<RangeControl
							label={__('Sliding Speed', 'experimental-block')}
							onChange={(value) => setAttributes({ speed: value })}
							shiftStep={1}
							min={1}
							max={20}
							value={speed}
						/>
						<RangeControl
							label={__('Slide Per Page', 'experimental-block')}
							onChange={(value) => setAttributes({ perPage: value })}
							shiftStep={1}
							min={1}
							max={10}
							value={perPage}
						/>
						{layout === 'list' && (
							<RangeControl
								label={__("Container Height", "experimental-block")}
								value={containerHeight}
								onChange={(value) => setAttributes({ containerHeight: value })}
								min={100}
								max={5000}
							/>
						)
						}
					</PanelBody>
				</InspectorControls>
			</Fragment>
			<div id={`post-slider-${blockId}`} style={getStyles()}>
				{ComponentToRender ? (
					<ComponentToRender attributes={attributes} />
				) : (
					<div>Component not found</div>
				)}
			</div>
		</div>
	);
}