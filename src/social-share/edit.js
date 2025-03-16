/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  InspectorControls,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
  ColorPalette,
  RangeControl,
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const {
    facebook,
    twitter,
    gmail,
    linkedIn,
    whatsApp,
    reddit,
    tumblr,
    diigo,
    viber,
    snapchat,
    pinterest,
    iconColor,
    textColor,
    iconSize,
    fontSize,
    borderColor,
    borderSize,
    borderRadius,
    backgroundColor,
    enablelabel,
    paddingHorizontal,
    paddingVertical
  } = attributes;

  const linkStyle = {
    color: textColor,
    fontSize: fontSize,
    border: `${borderSize}px solid ${borderColor}`,
    borderRadius: `${borderRadius}%`,
    paddingLeft: `${paddingHorizontal}px`,
    paddingRight: `${paddingHorizontal}px`,
    paddingTop: `${paddingVertical}px`,
    paddingBottom: `${paddingVertical}px`,
    backgroundColor: `${backgroundColor}`,
    textDecoration: "none",
    margin: "10px",
  };

  const facebookIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24h11.488v-9.294h-3.1v-3.622h3.1V9.413c0-3.066 1.808-4.775 4.653-4.775 1.356 0 2.771.248 3.145.365v3.52h-2.179c-1.710 0-2.216.799-2.216 2.04v2.568h4.072l-.528 3.622h-3.544V24h7.3c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
  const twitterIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M23.444 4.834c-.885.392-1.834.656-2.828.775 1.016-.609 1.794-1.574 2.162-2.724-.951.56-2.004.97-3.12 1.188-.896-.954-2.167-1.543-3.578-1.543-3.672 0-6.351 3.458-5.864 7.015-4.172-.209-7.876-2.214-10.365-5.276-.433.743-.681 1.604-.681 2.522 0 1.742.889 3.277 2.234 4.18-.826-.025-1.598-.255-2.276-.635-.001.021-.001.042-.001.063 0 2.429 1.73 4.467 4.017 4.933-.42.114-.861.175-1.31.175-.319 0-.629-.031-.935-.089.63 1.951 2.465 3.375 4.636 3.415-1.698 1.33-3.854 2.113-6.168 2.113-.401 0-.797-.024-1.188-.071 2.209 1.417 4.828 2.25 7.658 2.25 9.213 0 14.26-7.53 14.26-14.04 0-.214-.004-.426-.013-.638.978-.687 1.826-1.542 2.506-2.518z" />
    </svg>
  );
  const gmailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );

  const whatsAppIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M16 1.5C7.699 1.5 1 8.199 1 16.5c0 2.884.75 5.636 2.165 8.071L1 31.5l7.146-2.23c2.408 1.292 5.112 1.731 7.854 1.731 8.301 0 15-6.699 15-15S24.301 1.5 16 1.5zm0 27.125c-2.548 0-5.021-.676-7.156-1.946l-.515-.302-4.248 1.327 1.319-4.127-.335-.543C4.098 20.376 3.5 18.479 3.5 16.5 3.5 9.596 9.096 4 16 4s12.5 5.596 12.5 12.5S22.904 28.625 16 28.625zm7.292-9.479c-.4-.2-2.354-1.161-2.72-1.295-.366-.134-.632-.2-.898.201-.267.401-1.034 1.295-1.268 1.561-.234.267-.467.3-.867.1-.4-.2-1.686-.62-3.213-1.976-1.187-1.06-1.986-2.366-2.219-2.767-.234-.401-.025-.601.176-.801.181-.18.4-.467.6-.7.2-.234.267-.4.4-.667.134-.267.067-.501-.033-.701-.1-.2-.898-2.168-1.23-2.966-.322-.778-.648-.67-.898-.682-.234-.012-.501-.016-.768-.016-.267 0-.7.1-1.068.501-.367.4-1.4 1.367-1.4 3.334 0 1.966 1.434 3.867 1.634 4.134.2.267 2.82 4.3 6.855 6.034 4.034 1.734 4.034 1.134 4.766 1.067.733-.067 2.354-.934 2.68-1.834.328-.901.328-1.668.234-1.834-.1-.167-.367-.267-.767-.467z" />
    </svg>
  );
  const linkedInIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13 11.28h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-3v-10h3v1.43c.93-1.26 2.64-1.43 3.67-.46.72.66 1.08 1.61 1.08 2.54v6.49z" />
    </svg>
  );
  const redditIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      fill={iconColor}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 496 496"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          style={{ fill: iconColor }}
          d="M436.384,184.496c-14.208,0-27.28,4.984-37.544,13.264c-36.352-22.632-82.488-36.288-131.92-39.16 l25.792-80.8l70.88,16.528c1.864,25.576,23.44,45.816,49.704,45.816c27.48,0,49.856-22.16,49.856-49.408 c0-27.224-22.376-49.392-49.856-49.392c-19.208,0-35.92,10.84-44.248,26.672L286.68,48.808c-6.896-1.616-13.864,2.32-16.016,9.024 l-32.024,100.28c-53.272,1.304-103.36,14.984-142.376,38.928c-10.12-7.832-22.84-12.544-36.64-12.544 C26.752,184.496,0,211,0,243.568c0,20.144,10.224,37.936,25.816,48.592c-0.656,4.688-0.992,9.392-0.992,14.184 c0,40.712,23.88,78.576,67.256,106.624c41.568,26.888,96.608,41.688,154.92,41.688c58.32,0,113.344-14.8,154.92-41.688 c43.36-28.048,67.256-65.912,67.256-106.624c0-4.344-0.304-8.672-0.832-12.968c16.6-10.48,27.656-28.88,27.656-49.808 C496,211,469.264,184.496,436.384,184.496z"
        ></path>
        <g>
          <path
            style={{ fill: iconColor }}
            d="M422.52,70.168c7.968,3.52,13.544,11.4,13.544,20.568c0,9.784-6.344,18.032-15.144,21.168 c-1.12,9.504-2.712,18.888-4.8,28.104c26.168-1.472,47.016-22.968,47.016-49.264c0-24.976-18.848-45.64-43.176-48.888 C421.304,51.16,422.168,60.6,422.52,70.168z"
          ></path>
          <path
            style={{ fill: iconColor }}
            d="M496,243.568c0-32.568-26.736-59.08-59.616-59.08c-14.208,0-27.28,4.984-37.544,13.264 c-0.736-0.456-1.52-0.848-2.256-1.304c-11.68,24.688-26.92,47.584-45.2,68.136c2.456,4.688,3.992,9.92,3.992,15.528 c0,18.36-15.04,33.264-33.576,33.264c-6.72,0-13.024-2.008-18.368-5.376c-33.504,24.528-72.528,42.952-115.128,53.32 c12.168,10.152,31.616,15.176,59.432,15.176c0.096,0,0.168,0.016,0.264,0.016s0.176-0.016,0.264-0.016 c29.952,0,50.32-5.752,62.248-17.544c5.296-5.248,13.864-5.232,19.152,0c5.288,5.248,5.288,13.752,0,18.984 c-17.272,17.08-43.896,25.392-81.4,25.392c-0.088,0-0.168-0.016-0.264-0.016s-0.168,0.016-0.264,0.016 c-37.512,0-64.128-8.312-81.376-25.392c-3.16-3.144-4.4-7.408-3.792-11.472c-17.848,2.888-36.176,4.496-54.912,4.496 c-22.392,0-44.216-2.184-65.28-6.28c11.392,17.952,28.136,34.328,49.712,48.28c41.568,26.888,96.608,41.688,154.92,41.688 c58.32,0,113.344-14.8,154.92-41.688c43.36-28.048,67.256-65.912,67.256-106.624c0-4.344-0.304-8.672-0.832-12.968 C484.944,282.896,496,264.496,496,243.568z"
          ></path>
        </g>
        <path
          style={{ fill: iconColor }}
          d="M55.968,294.76c30.616,0,59.544-7.12,85.208-19.704c2.552-16.032,16.768-28.696,33.544-28.696 c2.776,0,5.424,0.44,8.008,1.088c30.92-26.952,52.872-63.6,60.944-105.12l-5.04,15.784c-53.272,1.304-103.36,14.984-142.376,38.928 c-10.12-7.832-22.84-12.544-36.64-12.544C26.752,184.496,0,211,0,243.568c0,20.144,10.224,37.936,25.816,48.592 c-0.016,0.088-0.016,0.168-0.024,0.24C35.624,293.944,45.696,294.76,55.968,294.76z"
        ></path>
      </g>
    </svg>
  );

  const tumblrIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M15.77 21.74c-1.59 0-3.38-.44-4.4-1.05v-5.69h6.71v-5.01h-6.71V2h-3.8C7.58 3.39 6.6 5.29 5.68 6.92c-.45.76-1.11 1.39-1.68 2.07-.06.07-.11.15-.17.23-.36.47-.76.96-1.12 1.47-.25.36-.51.73-.76 1.11-.31.46-.63.96-1.01 1.52-.02.04-.04.09-.06.13v.01s.01 0 .01.01v.01c.02.04.03.08.05.13.18.4.35.78.52 1.15.39.8.79 1.6 1.18 2.4.61 1.23 1.21 2.46 1.82 3.69.65 1.31 1.32 2.6 2 3.88.7 1.3 1.42 2.58 2.16 3.85.76 1.3 1.54 2.58 2.35 3.85.81 1.3 1.63 2.58 2.47 3.85.87 1.29 1.76 2.57 2.67 3.84.95 1.3 1.91 2.57 2.88 3.85.99 1.3 2 2.57 3.02 3.84.96 1.26 1.95 2.5 2.94 3.72.96 1.19 1.95 2.36 2.94 3.51 1.02 1.2 2.04 2.36 3.06 3.51 1.02 1.14 2.04 2.25 3.06 3.34 1.02 1.1 2.05 2.18 3.07 3.25 1.02 1.06 2.05 2.1 3.07 3.12 1.02 1.02 2.05 2.01 3.08 2.98 1.03.96 2.07 1.9 3.1 2.81 1.04.92 2.08 1.82 3.11 2.69 1.03.86 2.07 1.71 3.1 2.52 1.03.81 2.07 1.59 3.1 2.34 1.03.75 2.06 1.48 3.09 2.17 1.03.69 2.07 1.35 3.1 1.99 1.03.64 2.06 1.26 3.09 1.83 1.03.57 2.07 1.12 3.09 1.63 1.03.51 2.06.99 3.09 1.43 1.03.44 2.06.85 3.09 1.2.82.3 1.64.55 2.47.76z" />
    </svg>
  );
  const pinterestIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.1 2.4 7.64 5.91 9.18-.08-.77-.16-1.94.03-2.78.18-.77 1.18-4.93 1.18-4.93s-.3-.61-.3-1.51c0-1.42.83-2.48 1.87-2.48.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.42-.24 1 0 1.83.54 2.28.65.54 1.95.3 2.3-.72.35-1.02.98-2.66.98-3.59 0-1.57-1.07-2.75-3.02-2.75-2.2 0-3.58 1.64-3.58 3.46 0 .69.27 1.43.6 1.83.06.08.07.14.05.23-.05.25-.16.77-.18.88-.03.13-.1.16-.23.1-.87-.36-1.41-1.49-1.41-2.41 0-1.95 1.42-3.76 4.1-3.76 2.15 0 3.81 1.54 3.81 3.6 0 2.14-1.35 3.86-3.23 3.86-.63 0-1.23-.33-1.44-.73l-.39 1.48c-.14.53-.52 1.2-.77 1.61.57.18 1.16.28 1.78.28 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z" />
    </svg>
  );
  const viberIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M12 0C5.37 0 0 4.82 0 10.76c0 3.34 1.58 6.44 4.24 8.37v5.47c0 .43.35.78.78.78.1 0 .2-.02.3-.06L9.8 21.3c.79.11 1.61.18 2.45.18 6.63 0 12-4.82 12-10.76C24 4.82 18.63 0 12 0zM8.65 18.51L4.25 19.97v-3.56C2.24 14.56 1 12.73 1 10.76 1 5.68 6.07 1 12 1s11 4.68 11 9.76c0 5.08-5.07 9.76-11 9.76-.8 0-1.59-.07-2.35-.18zm5.22-3.74l-.25-.01c-.73-.05-1.44-.24-2.09-.58-.64-.33-1.26-.8-1.85-1.38-.59-.59-1.05-1.2-1.38-1.85-.33-.64-.53-1.36-.57-2.09-.05-.78.4-1.47 1.12-1.6l.14-.02c.24 0 .48.08.66.22.19.14.32.36.34.6.1.91.4 1.77.89 2.54.4.61.88 1.12 1.42 1.54.27.22.56.41.87.57.31.16.65.27 1.01.3.23.02.45.14.6.34.14.18.21.42.19.66-.1.74-.79 1.21-1.52 1.16zM15.62 14c.03 0 .05.01.08.01.61 0 1.11-.46 1.16-1.06.07-.82.33-1.58.77-2.25.47-.72.9-1.18 1.6-1.18h.01c.24 0 .48-.08.67-.22.2-.14.33-.36.35-.6.08-.9-.6-1.67-1.51-1.75-1.43-.13-2.99.37-4.2 1.47-.85.76-1.46 1.66-1.86 2.66-.39.97-.54 1.94-.43 2.86.1.75.71 1.31 1.46 1.31.03 0 .05-.01.08-.01zm2.79-5.13c.39-.45.94-.69 1.52-.65.74.05 1.4-.55 1.4-1.31 0-.8-.62-1.4-1.39-1.41-2.02-.03-3.69 1.37-4.4 3.34-.19.52.1 1.09.64 1.28.23.08.47.05.68-.1.46-.34.98-.74 1.55-1.15z" />
    </svg>
  );

  const diigoIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13h-2v6h2V7zm6 0h-2v6h2V7zm-3 2h-2v4h2V9zm3 6h-2v2h2v-2z" />
    </svg>
  );

  const snapchatIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill={iconColor}
    >
      <path d="M23.25 15.18c-.11-.29-.37-.49-.69-.49-.2 0-.37.07-.52.17-.34.22-.81.48-1.34.48-.35 0-.71-.08-1.07-.23-.5-.21-.94-.47-1.31-.77-.41-.34-.69-.58-.93-.75-.24-.17-.5-.24-.77-.2-.44.06-.74.39-1.15.85-.38.43-.77.86-1.45.86-.67 0-1.06-.44-1.44-.86-.41-.46-.71-.79-1.15-.85-.26-.04-.53.03-.77.2-.24.17-.51.41-.93.75-.37.3-.81.56-1.31.77-.36.15-.72.23-1.07.23-.53 0-1-.26-1.34-.48-.15-.1-.32-.17-.52-.17-.32 0-.58.2-.69.49-.1.27-.03.58.2.77.44.4 1.47 1.05 2.69 1.41.2.06.35.24.38.45.07.48.2 1.14.46 1.68.24.51.6.78 1.05.78.23 0 .47-.05.72-.15.43-.17.81-.34 1.09-.34.1 0 .2.02.31.03.4.08.65.42.91.74.3.37.64.79 1.34.79.71 0 1.05-.42 1.34-.79.26-.32.51-.66.91-.74.11-.02.21-.03.31-.03.28 0 .66.17 1.09.34.25.1.49.15.72.15.45 0 .81-.27 1.05-.78.26-.54.39-1.21.46-1.68.03-.21.18-.39.38-.45 1.22-.36 2.25-1.01 2.69-1.41.24-.2.31-.5.2-.77zM12 2C7.2 2 3 6.2 3 11c0 1.76.47 3.42 1.29 4.87.3.53.97.78 1.54.6.55-.17 1.16-.46 1.79-.83.62-.36 1.22-.82 1.76-1.32.51-.47 1-.88 1.62-.88s1.11.41 1.62.88c.54.5 1.14.96 1.76 1.32.63.37 1.24.66 1.79.83.57.18 1.24-.07 1.54-.6C20.53 14.42 21 12.76 21 11c0-4.8-4.2-9-9-9z" />
    </svg>
  );

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody
          title={__("General Settings", "experimental-block")}
          initialOpen={false}
        >
          <PanelColorSettings
            title={__("Color Settings", "experimental-block")}
            colorSettings={[
              {
                value: iconColor,
                onChange: (newColor) => setAttributes({ iconColor: newColor }),
                label: __("Icon Color", "experimental-block"),
              },
              {
                value: textColor,
                onChange: (newColor) => setAttributes({ textColor: newColor }),
                label: __("Text Color", "experimental-block"),
              },
              {
                value: backgroundColor,
                onChange: (newColor) =>
                  setAttributes({ backgroundColor: newColor }),
                label: __("Backgroundcolor Color", "experimental-block"),
              },
              {
                value: borderColor,
                onChange: (newColor) =>
                  setAttributes({ borderColor: newColor }),
                label: __("Border Color", "experimental-block"),
              },
            ]}
          />
          <h3>{__("Adjustment Settings", "experimental-block")}</h3>
          <ToggleControl
            label={__("Enable Label", "experimental-block")}
            checked={enablelabel}
            onChange={(newValue) => setAttributes({ enablelabel: newValue })}
          />
          {enablelabel === true && (
            <RangeControl
              label={__("Font Size", "experimental-block")}
              value={fontSize}
              onChange={(newSize) => setAttributes({ fontSize: newSize })}
              min={10}
              max={100}
            />
          )}
          <RangeControl
            label={__("Icon Size", "experimental-block")}
            value={iconSize}
            onChange={(newSize) => setAttributes({ iconSize: newSize })}
            min={10}
            max={100}
          />

          <RangeControl
            label={__("Border Size", "experimental-block")}
            value={borderSize}
            onChange={(newSize) => setAttributes({ borderSize: newSize })}
            min={0}
            max={20}
          />
          <RangeControl
            label={__("Border Radius", "experimental-block")}
            value={borderRadius}
            onChange={(newSize) => setAttributes({ borderRadius: newSize })}
            min={1}
            max={100}
          />

          <RangeControl
            label={__("Padding Vertical Size", "experimental-block")}
            value={paddingVertical}
            onChange={(newSize) => setAttributes({ paddingVertical: newSize })}
            min={1}
            max={100}
          />
           <RangeControl
            label={__("Padding Horizontal Size", "experimental-block")}
            value={paddingHorizontal}
            onChange={(newSize) => setAttributes({ paddingHorizontal: newSize })}
            min={1}
            max={100}
          />
        </PanelBody>
        <PanelBody
          title={__("Social Settings", "experimental-block")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Enable Facebook", "experimental-block")}
            checked={facebook}
            onChange={(value) => setAttributes({ facebook: value })}
          />
          <ToggleControl
            label={__("Enable twitter", "experimental-block")}
            checked={twitter}
            onChange={(value) => setAttributes({ twitter: value })}
          />
          <ToggleControl
            label={__("Enable gmail", "experimental-block")}
            checked={gmail}
            onChange={(value) => setAttributes({ gmail: value })}
          />
          <ToggleControl
            label={__("Enable whatsApp", "experimental-block")}
            checked={whatsApp}
            onChange={(value) => setAttributes({ whatsApp: value })}
          />
          <ToggleControl
            label={__("Enable linkedIn", "experimental-block")}
            checked={linkedIn}
            onChange={(value) => setAttributes({ linkedIn: value })}
          />
          <ToggleControl
            label={__("Enable reddit", "experimental-block")}
            checked={reddit}
            onChange={(value) => setAttributes({ reddit: value })}
          />
          <ToggleControl
            label={__("Enable tumblr", "experimental-block")}
            checked={tumblr}
            onChange={(value) => setAttributes({ tumblr: value })}
          />
          <ToggleControl
            label={__("Enable diigo", "experimental-block")}
            checked={diigo}
            onChange={(value) => setAttributes({ diigo: value })}
          />
          <ToggleControl
            label={__("Enable pinterest", "experimental-block")}
            checked={pinterest}
            onChange={(value) => setAttributes({ pinterest: value })}
          />
          <ToggleControl
            label={__("Enable viber", "experimental-block")}
            checked={viber}
            onChange={(value) => setAttributes({ viber: value })}
          />
          <ToggleControl
            label={__("Enable snapchat", "experimental-block")}
            checked={snapchat}
            onChange={(value) => setAttributes({ snapchat: value })}
          />
        </PanelBody>
      </InspectorControls>
      <div className="wp-block-social-share">
        {facebook && (
          <a style={linkStyle}>
            {facebookIcon}
            {enablelabel === true && "Facebook"}
          </a>
        )}
        {twitter && (
          <a style={linkStyle}>
            {twitterIcon}
            {enablelabel === true && "Twitter"}
          </a>
        )}
        {gmail && (
          <a style={linkStyle}>
            {gmailIcon} {enablelabel === true && "Gmail"}
          </a>
        )}
        {whatsApp && (
          <a style={linkStyle}>
            {whatsAppIcon}
            {enablelabel === true && "WhatsApp"}
          </a>
        )}
        {linkedIn && (
          <a style={linkStyle}>
            {linkedInIcon}
            {enablelabel === true && "LinkedIn"}
          </a>
        )}
        {reddit && (
          <a style={linkStyle}>
            {redditIcon}
            {enablelabel === true && "Reddit"}
          </a>
        )}
        {tumblr && (
          <a style={linkStyle}>
            {tumblrIcon}
            {enablelabel === true && "Tumblr"}
          </a>
        )}
        {diigo && (
          <a style={linkStyle}>
            {diigoIcon}
            {enablelabel === true && "Diigo"}
          </a>
        )}
        {pinterest && (
          <a style={linkStyle}>
            {pinterestIcon}
            {enablelabel === true && "Pinterest"}
          </a>
        )}
        {viber && (
          <a style={linkStyle}>
            {viberIcon}
            {enablelabel === true && "Viber"}
          </a>
        )}
        {snapchat && (
          <a style={linkStyle}>
            {snapchatIcon}
            {enablelabel === true && "Snapchat"}
          </a>
        )}
      </div>
    </div>
  );
}
