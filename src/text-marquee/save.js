/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
  const {
    fontSize,
    fontAppearance,
    letterSpacing,
    decoration,
    letterCase,
    fontWeight,
    speed,
    pauseOnHover,
    textColor,
    inputs,
    inputGap,
  } = attributes;

  const slideSpeed = speed * 1000;

  const textStyle = {
    fontSize: `${fontSize}px`,
    fontStyle: `${fontAppearance}`,
    fontWeight: `${fontWeight}`,
    letterSpacing: `${letterSpacing}px`,
    textDecoration: `${decoration}`,
    textTransform: `${letterCase}`,
    color: `${textColor}`,
  };

  return (
    <div {...useBlockProps.save()}>
      <div
        className="text-marquee"
        data-duration={slideSpeed}
        data-duplicated="true"
        data-pauseOnHover={pauseOnHover}
        data-gap={`${inputGap}px`}
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        <div
          className="experimental-block-text-marquee-item"
          style={{ display: "flex" }}
        >
          <span style={textStyle}>{inputs}</span>
        </div>
      </div>
    </div>
  );
}
