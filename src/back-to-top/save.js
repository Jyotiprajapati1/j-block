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
    icons,
    iconSize,
    iconColor,
    strokeWidth,
    iconBackground,
    padding,
    border,
    borderRadius,
    borderColor,
    paddingHorizontal,
    paddingVertical,
  } = attributes;

  const cornerRightUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      fill="none"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="10 9 15 4 20 9" />
      <path d="M4 20h7a4 4 0 0 0 4-4V4" />
    </svg>
  );

  const arrowUpIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      fill="none"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-up"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );

  const cornerLeftUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      fill="none"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-corner-left-up"
    >
      <polyline points="14 9 9 4 4 9" />
      <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
    </svg>
  );
  const arrowBigUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-big-up"
    >
      <path d="M9 18v-6H5l7-7 7 7h-4v6H9z" />
    </svg>
  );
  const arroWUpFromLine = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-up-from-line"
    >
      <path d="m18 9-6-6-6 6" />
      <path d="M12 3v14" />
      <path d="M5 21h14" />
    </svg>
  );

  const squareArrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      fill="none"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-square-arrow-up"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );

  const circleChevronUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      stroke={iconColor}
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-chevron-up"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m8 14 4-4 4 4" />
    </svg>
  );

  const selectedIcon = () => {
    switch (icons) {
      case "cornerRightUp":
        return cornerRightUp;
      case "arrowUpIcon":
        return arrowUpIcon;
      case "cornerLeftUp":
        return cornerLeftUp;
      case "arrowBigUp":
        return arrowBigUp;
      case "arroWUpFromLine":
        return arroWUpFromLine;
      case "squareArrowUp":
        return squareArrowUp;
      case "circleChevronUp":
        return circleChevronUp;
      default:
        return null;
    }
  };

  return (
    <div {...useBlockProps.save()}>
      <div className="back-to-top-block">
        <a
          className="back-to-top-icon"
          style={{
            background: iconBackground,
            paddingLeft: `${paddingHorizontal}px`,
            paddingRight: `${paddingHorizontal}px`,
            paddingTop: `${paddingVertical}px`,
            paddingBottom: `${paddingVertical}px`,
            borderRadius: `${borderRadius}% `,
            border: `${border}px solid ${borderColor}`,
          }}
        >
          {selectedIcon()}
        </a>
      </div>
    </div>
  );
}
