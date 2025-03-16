import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	PanelColorSettings,
	BlockControls
} from "@wordpress/block-editor";

import { useEffect, useRef, Fragment } from "@wordpress/element";

import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
	TextareaControl,
} from "@wordpress/components";

import img1 from "./images/one.jpg";
import img2 from "./images/two.jpg";
import img3 from "./images/three.jpg";

import $ from 'jquery';
import 'jquery.marquee';

import './editor.scss';

export default function Edit(props) {
	const { setAttributes, attributes } = props;
	const { enableSvg, svgInput, postTickerBackground, postTextColor, postCount, breakingNewLabel, breakingNewColor, breakingNewBackground, contentType, postIds, categoryIds, tagIds, showThumbnail, slideSpeed, pauseOnHover, gapBetween, blockId } = attributes;

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

	const el = useRef();
	// Initialize marquee only on mount
	useEffect(() => {
		const $el = $(el.current);
		$el.marquee({
			// Add options if needed
			// For example:
			duration: slideSpeed,
			gap: gapBetween,
			delayBeforeStart: 0,
			direction: 'left',
			duplicated: true,
			pauseOnHover: pauseOnHover
		});

		return () => {
			$el.marquee('destroy'); // Adjust based on how you need to clean up
		};

	}, [slideSpeed, gapBetween, pauseOnHover]); // Empty array ensures it runs only once

	const breakingNewsBgColor = [
		{
			value: breakingNewBackground,
			onChange: colorValue => setAttributes({ breakingNewBackground: colorValue }),
			label: __("Background Color", 'experimental-block')
		}
	];

	const breakingNewsTextColor = [
		{
			value: breakingNewColor,
			onChange: colorValue => setAttributes({ breakingNewColor: colorValue }),
			label: __("Text Color", 'experimental-block')
		}
	];

	const postTickerBackgroundColor = [
		{
			value: postTickerBackground,
			onChange: colorValue => setAttributes({ postTickerBackground: colorValue }),
			label: __("Background Color", 'experimental-block')
		}
	];

	const postTitleColor = [
		{
			value: postTextColor,
			onChange: colorValue => setAttributes({ postTextColor: colorValue }),
			label: __("Post Title Color", 'experimental-block')
		}
	];


	return (
		<div {...useBlockProps()}>
			{console.log(blockId)}
			<Fragment>
				<BlockControls />
				<InspectorControls key="setting">
					<PanelBody title={__('Content Setting', 'experimental-block')} initialOpen={false}>
						<SelectControl
							label={__('Content Type', 'experimental-block')}
							value={contentType}
							options={[
								{
									label: __('Post Ids', 'experimental-block'),
									value: 'postIds'
								}, {
									label: __('Category Ids', 'experimental-block'),
									value: 'catIds'
								}, {
									label: __('Tags Ids', 'experimental-block'),
									value: 'tagIds'
								}, {
									label: __('Recent Posts', 'experimental-block'),
									value: 'recentPost'
								}
							]}
							onChange={(val) => setAttributes({ contentType: val })}
						/>
						{
							contentType == 'postIds' &&
							<TextControl
								label={__('Post Ids', 'experimental-block')}
								value={postIds}
								onChange={value => setAttributes(
									{
										postIds: value
									}
								)}
							/>
						}

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

						{
							contentType != 'postIds' &&
							<RangeControl
								label={__('Post Count', 'experimental-block')}
								onChange={(value) => setAttributes({ postCount: value })}
								shiftStep={1}
								min={1}
								max={20}
								value={postCount}
							/>
						}

						<ToggleControl
							label={__('Show Thumbnail', 'experimental-block')}
							checked={showThumbnail}
							onChange={() => setAttributes({ showThumbnail: !showThumbnail })}
						/>
					</PanelBody>
					<PanelBody title={__('Breaking News Setting')} initialOpen={false}>
						<TextControl
							label={__('Breaking News Label', 'experimental-block')}
							value={breakingNewLabel}
							onChange={value => setAttributes(
								{
									breakingNewLabel: value
								}
							)}
						/>
						<ToggleControl
							label={__('Enable SVG option', 'experimental-block')}
							checked={enableSvg}
							onChange={() => setAttributes({ enableSvg: !enableSvg })}
						/>
						{
							enableSvg && (
								<TextareaControl
									label={__('Svg Input Area', 'experimental-block')}
									value={svgInput}
									onChange={value => setAttributes(
										{
											svgInput: value
										}
									)}
								/>
							)
						}
						<PanelColorSettings
							title={__('Breaking News Background Color', 'experimental-block')}
							colorSettings={breakingNewsBgColor}
							initialOpen={false}
						/>
						<PanelColorSettings
							title={__('Breaking News Text Color', 'experimental-block')}
							colorSettings={breakingNewsTextColor}
							initialOpen={false}
						/>
					</PanelBody>
					<PanelBody title={__('Post Ticker Setting')} initialOpen={false}>
						<PanelColorSettings
							title={__('Post Ticker Background Color', 'experimental-block')}
							colorSettings={postTickerBackgroundColor}
							initialOpen={false}
						/>
						<PanelColorSettings
							title={__('Post Title Color', 'experimental-block')}
							colorSettings={postTitleColor}
							initialOpen={false}
						/>
						<RangeControl
							label={__('Slide Speed', 'experimental-block')}
							onChange={(value) => setAttributes({ slideSpeed: value })}
							shiftStep={1000}
							min={1000}
							max={50000}
							value={slideSpeed}
						/>
						<RangeControl
							label={__('Gap Between First and Last', 'experimental-block')}
							onChange={(value) => setAttributes({ gapBetween: value })}
							shiftStep={5}
							min={10}
							max={1000}
							value={gapBetween}
						/>
						<ToggleControl
							label={__('Pause on Hover', 'experimental-block')}
							checked={pauseOnHover}
							onChange={() => setAttributes({ pauseOnHover: !pauseOnHover })}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>

			<div
				className="experimental-block-post-ticker"
				style={{
					backgroundColor: postTickerBackground,
				}}
			>
				<div
					className="experimental-block-post-ticker-breaking-news"
					style={{
						backgroundColor: breakingNewBackground,
						color: breakingNewColor,
						display: 'flex',
						gap: '10px'

					}}
				>
					{breakingNewLabel && breakingNewLabel.trim() !== "" && <span>{breakingNewLabel}</span>}
					{
						enableSvg && (
							<span>
								<div dangerouslySetInnerHTML={{ __html: svgInput }} />
							</span>
						)
					}

				</div>

				<div ref={el} style={{ overflow: 'hidden', whiteSpace: 'nowrap', flex: 1 }}>
					<div style={{ display: 'inline-block', padding: '0 20px' }}>
						<div className='experimental-block-post-ticker-item'>
							{
								showThumbnail &&
								<img src={img1} alt="Description of the image" />
							}

							<p style={{
								color: postTextColor
							}}>I can be a React component, multiple React components, or just some text.</p>
						</div>
					</div>
					<div style={{ display: 'inline-block', padding: '0 20px' }}>
						<div className='experimental-block-post-ticker-item'>
							{
								showThumbnail &&
								<img src={img2} alt="Description of the image" />
							}

							<p style={{
								color: postTextColor
							}}>I can be a React component, multiple React components, or just some text.</p>
						</div>
					</div>
					<div style={{ display: 'inline-block', padding: '0 20px' }}>
						<div className='experimental-block-post-ticker-item'>
							{
								showThumbnail &&
								<img src={img3} alt="Description of the image" />
							}

							<p style={{
								color: postTextColor
							}}>
								I can be a React component, multiple React components, or just some text.</p>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
}
