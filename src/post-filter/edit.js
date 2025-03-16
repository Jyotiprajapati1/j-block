import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	PanelColorSettings,
	BlockControls,
} from "@wordpress/block-editor";

import { useEffect, useRef, Fragment } from "@wordpress/element";

import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl
} from "@wordpress/components";

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


import './editor.scss';

export default function Edit(props) {
	const { setAttributes, attributes } = props;
	const { postCount,
		contentType,
		categoryIds,
		tagIds,
		showThumbnail,
		design,
		layout,
		showAuthor,
		showDate,
		showExcert,
		gridColumn,
		tabAlign,
		textColor,
		backgroundColor,
		activeBackgroundColor,
		activeTextColor,
		borderColor,
		fontSize,
		borderSize,
		radius,
		paddingHorizontal,
		paddingVertical
	} = attributes;

	const toCapitalCase = (str) => {
		return str
			.toLowerCase() // Convert the entire string to lowercase first
			.split(' ')    // Split the string into an array of words
			.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
			.join(' ');    // Join the words back into a single string
	}

	const componentName = `${toCapitalCase(layout)}Design${toCapitalCase(design)}`;
	const ComponentToRender = componentMap[componentName];

	const getStyles = () => ({
		'--tab-align'				: tabAlign,
		'--font-size'				: `${fontSize}px`,
		'--border-size'				: `${borderSize}px`,
		'--border-radius'			: `${radius}%`,
		'--padding-horizontal'		: `${paddingHorizontal}px`,
		'--padding-vertical'		: `${paddingVertical}px`,
		'--text-color'				: textColor,
		'--active-text-color'		: activeTextColor,
		'--background-color'		: backgroundColor,
		'--active-background-color' : activeBackgroundColor,
		'--border-color'			: borderColor,
	});
	return (
		<div {...useBlockProps()}>
			<Fragment>
				<BlockControls />
				<InspectorControls key="setting">
					<PanelBody title={__('Content Setting', 'experimental-block')} initialOpen={false}>
						<SelectControl
							label={__('Content Type', 'experimental-block')}
							value={contentType}
							options={[
								{
									label: __('Category Ids', 'experimental-block'),
									value: 'catIds'
								}, {
									label: __('Tags Ids', 'experimental-block'),
									value: 'tagIds'
								}
							]}
							onChange={(val) => setAttributes({ contentType: val })}
						/>
						{
							contentType == 'catIds' &&
							<TextControl
								label={__('Category Ids', 'experimental-block')}
								value={categoryIds}
								onChange={value => setAttributes(
									{
										categoryIds: value
									}
								)}
							/>
						}
						{
							contentType == 'tagIds' &&
							<TextControl
								label={__('Tag Ids', 'experimental-block')}
								value={tagIds}
								onChange={value => setAttributes(
									{
										tagIds: value
									}
								)}
							/>
						}
						<RangeControl
							label={__('Post Count', 'experimental-block')}
							onChange={(value) => setAttributes({ postCount: value })}
							shiftStep={1}
							min={1}
							max={100}
							value={postCount}
						/>

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
						{layout === "grid" && (
							<RangeControl
								label={__('Grid Column', 'experimental-block')}
								onChange={(value) => setAttributes({ gridColumn: value })}
								shiftStep={1}
								min={1}
								max={4}
								value={gridColumn}
							/>
						)}

					</PanelBody >
					<PanelBody title={__('Tab Button Setting', 'experimental-block')} initialOpen={false}>
						<RangeControl
							label={__('Font Size', 'experimental-block')}
							value={fontSize}
							onChange={(newsize) => setAttributes({ fontSize: newsize })}
							min={5}
							max={100}
						/>
						<SelectControl
							label={__('Text Align', 'experimental-block')}
							value={tabAlign}
							options={[
								{ label: __('Center', 'experimental-block'), value: 'center' },
								{ label: __('Right', 'experimental-block'), value: 'right' },
								{ label: __('left', 'experimental-block'), value: 'left' }
							]}
							onChange={(newAlign) => setAttributes({ tabAlign: newAlign })}
						/>
						<RangeControl
							label={__('Border Size', 'experimental-block')}
							value={borderSize}
							onChange={(newsize) => setAttributes({ borderSize: newsize })}
							min={0}
							max={20}
						/>
						<RangeControl
							label={__('Border Radius', 'experimental-block')}
							value={radius}
							onChange={(newsize) => setAttributes({ radius: newsize })}
							min={0}
							max={50}
						/>
						<RangeControl
							label={__('Padding Horizontal', 'experimental-block')}
							value={paddingHorizontal}
							onChange={(newsize) => setAttributes({ paddingHorizontal: newsize })}
							min={0}
							max={100}
						/>
						<RangeControl
							label={__('Padding Horizontal', 'experimental-block')}
							value={paddingVertical}
							onChange={(newsize) => setAttributes({ paddingVertical: newsize })}
							min={0}
							max={100}
						/>
						<PanelColorSettings
							title={__("Color Settings")}
							colorSettings={[
								{
									value: textColor,
									onChange: (newColor) => setAttributes({ textColor: newColor }),
									label: __("Text Color"),
								},
								{
									value: activeTextColor,
									onChange: (newColor) => setAttributes({ activeTextColor: newColor }),
									label: __("Active Text Color"),
								},
								{
									value: backgroundColor,
									onChange: (newColor) => setAttributes({ backgroundColor: newColor }),
									label: __("Background Color"),
								},
								{
									value: activeBackgroundColor,
									onChange: (newColor) => setAttributes({ activeBackgroundColor: newColor }),
									label: __("Active Background Color"),
								},
								{
									value: borderColor,
									onChange: (newColor) => setAttributes({ borderColor: newColor }),
									label: __("Border Color"),
								}
							]}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>

			<div style={getStyles()}>
				{ComponentToRender ? (
					<ComponentToRender attributes={attributes} />

				) : (
					<div>Component not found</div>
				)}
			</div>
		</div>
	);
}
