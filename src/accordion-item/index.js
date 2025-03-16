/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import classnames from "classnames";
import {
  RichText,
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RangeControl, ColorPalette } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import "./editor.scss";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
  attributes: {
    buttonText: {
      type: "string",
      default: "Enter accordion heading...",
    },
    fontSize: {
      type: "number",
      default: 16, // Default font size
    },
    textColor: {
      type: "string",
      default: "#000000", // Default text color
    },
  },

  edit: ({ attributes, setAttributes, clientId }) => {
    const { buttonText, fontSize, textColor } = attributes;

    // Ensure useSelect is imported
    const { hasChildBlocks } = useSelect(
      (select) => {
        const { getBlockOrder } = select("core/block-editor");

        return {
          hasChildBlocks: getBlockOrder(clientId).length > 0,
        };
      },
      [clientId]
    );

    const blockProps = useBlockProps({
      className: "splide__slide",
    });

    const innerBlocksProps = useInnerBlocksProps(
      { ...blockProps },
      {
        renderAppender: hasChildBlocks
          ? undefined
          : InnerBlocks.ButtonBlockAppender,
      }
    );

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Font Size","experimental-block")}>
            <RangeControl
              label={__("Font Size","experimental-block")}
              value={fontSize}
              onChange={(value) => setAttributes({ fontSize: value })}
              min={10}
              max={100}
            />
          </PanelBody>
          <PanelBody title={__("Text Color","experimental-block")}>
            <ColorPalette
              value={textColor}
              onChange={(color) => setAttributes({ textColor: color })}
            />
          </PanelBody>
        </InspectorControls>
        <div className="ac">
          <h2 className="ac-header">
            <RichText
              tagName="span"
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
              placeholder={__("Add button text…","experimental-block")}
              style={{
                fontSize: `${fontSize}px`,
                color: textColor, // Apply text color
              }} // Apply font size via inline style
            />
            <button type="button" className="ac-trigger"></button>
          </h2>
          <div className="ac-panel">
            <div {...innerBlocksProps} />
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { buttonText, fontSize, textColor } = attributes;

    const blockProps = useBlockProps.save({
      className: "splide__slide",
    });

    return (
      <div className="ac">
        <h2 className="ac-header">
          <button
            type="button"
            className="ac-trigger"
            style={{
              fontSize: `${fontSize}px`,
              color: textColor, // Ensure text color is applied
            }} // Ensure font size is applied
          >
            <RichText.Content tagName="span" value={buttonText} />
          </button>
        </h2>
        <div className="ac-panel">
          <div {...useInnerBlocksProps.save()} />
        </div>
      </div>
    );
  },
});
