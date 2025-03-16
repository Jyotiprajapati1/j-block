/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
  const { attributes } = props;
  const {
    textAlign,
    progressBarType,
    progressNum,
    progressBarColor,
    progressBarPathColor,
    progressBarWidth,
    progressBarStrokeWidth,
    progressBarTrialWidth
  } = attributes;

  const style =
  (progressBarType === "line" || progressBarType === "circle") 
    ? { width: `${progressBarWidth}px` }
    : {};


  return (
    <div {...useBlockProps.save()} style={{ textAlign: textAlign }}>
      <div
        className="progressbar-item"
        bar-type={progressBarType}
        bar-color={progressBarColor}
        bar-path-color={progressBarPathColor}
        bar-progress-count={progressNum}
        bar-stroke-width={progressBarStrokeWidth}
        bar-trial-width={progressBarTrialWidth}
        style={{ ...style }}
      ></div>
    </div>
  );
}




