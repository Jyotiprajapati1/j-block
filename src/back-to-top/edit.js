import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  RangeControl,
  ColorPalette,
  SelectControl,
} from "@wordpress/components";
import { Fragment, useState, useEffect } from "@wordpress/element";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const {
    icons,
    iconSize,
    iconColor,
    strokeWidth,
    iconBackground,
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


  const iconOptions = [
    { label: "Corner Right Up", value: "cornerRightUp" },
    { label: "Arrow Up", value: "arrowUpIcon" },
    { label: "Corner Left Up", value: "cornerLeftUp" },
    { label: "Arrow Big Up", value: "arrowBigUp" },
    { label: "Arrow Up From Line", value: "arroWUpFromLine" },
    { label: "Square Arrow Up", value: "squareArrowUp" },
    { label: "Circle Chevron Up", value: "circleChevronUp" },
  ];

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
    <div {...useBlockProps()}>
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Icon Settings", "experimental-block")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Choose Icon", "experimental-block")}
              value={icons}
              options={iconOptions}
              onChange={(newIcon) => setAttributes({ icons: newIcon })}
            />
            <RangeControl
              label={__("Icon Size", "experimental-block")}
              value={iconSize}
              onChange={(newSize) => setAttributes({ iconSize: newSize })}
              min={15}
              max={200}
            />
            <RangeControl
              label={__("Stroke Width", "experimental-block")}
              value={strokeWidth}
              onChange={(newWidth) => setAttributes({ strokeWidth: newWidth })}
              min={1}
              max={5}
            />

            <PanelColorSettings
              title={__("Icon Color", "experimental-block")}
              colorSettings={[
                {
                  value: iconColor,
                  onChange: (newColor) =>
                    setAttributes({ iconColor: newColor }),
                  label: __("Icon Color", "experimental-gallery"),
                },
                {
                  value: iconBackground,
                  onChange: (newColor) =>
                    setAttributes({ iconBackground: newColor }),
                  label: __("Icon Background Color", "experimental-gallery"),
                },
              ]}
            />
          </PanelBody>

          <PanelBody
            title={__("Spacing Settings", "experimental-block")}
            initialOpen={true}
          >
            <PanelColorSettings
              title={__("Icon Color", "experimental-block")}
              colorSettings={[
                {
                  value: borderColor,
                  onChange: (newColor) =>
                    setAttributes({ borderColor: newColor }),
                  label: __("Border Color", "experimental-block"),
                },
              ]}
            />
            <RangeControl
              label={__("Border Size", "experimental-block")}
              value={border}
              onChange={(newSize) => setAttributes({ border: newSize })}
              min={1}
              max={10}
            />
            <RangeControl
              label={__("Border Radius Size", "experimental-block")}
              value={borderRadius}
              onChange={(newSize) => setAttributes({ borderRadius: newSize })}
              min={1}
              max={100}
            />
            <RangeControl
              label={__("Padding Horizontal", "experimental-block")}
              value={paddingHorizontal}
              onChange={(newSize) => setAttributes({ paddingHorizontal: newSize })}
              min={1}
              max={100}
            />
            <RangeControl
              label={__("Padding Vertical", "experimental-block")}
              value={paddingVertical}
              onChange={(newSize) => setAttributes({ paddingVertical: newSize })}
              min={1}
              max={100}
            />
          </PanelBody>
        </InspectorControls>
        <div className="back-to-top-block">
          <a
            className="back-to-top-icon-editor"
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
      </Fragment>
    </div>
  );
}
