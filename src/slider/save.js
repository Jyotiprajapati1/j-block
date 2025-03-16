/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
    useBlockProps,
    useInnerBlocksProps,
  } from '@wordpress/block-editor';


import { Splide, SplideTrack } from '@splidejs/react-splide';

// Default theme
// import '@splidejs/react-splide/css';

// // or other themes
// import '@splidejs/react-splide/css/skyblue';
// import '@splidejs/react-splide/css/sea-green';

// // or only core styles
// import '@splidejs/react-splide/css/core';

import "./style.scss";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
  const { perPage, autoPlay, showDots, showArrow } = attributes;

  const blockProps = useBlockProps.save();
  const innerBlocksProps = useInnerBlocksProps.save();

  const splideOptions = JSON.stringify({
    type: "loop",
    perPage    : perPage,
    pagination : showDots,
    arrows     : showArrow,
    gap        : 30,
    autoplay   : autoPlay
  });

  return (
    <div {...blockProps}>
      <Splide
        className="main-slider"
        hasTrack={false}
        aria-label="..."
        data-splide={splideOptions}  // Use dynamic data-splide
      >
        <SplideTrack>{innerBlocksProps.children}</SplideTrack>
      </Splide>
    </div>
  );

}
