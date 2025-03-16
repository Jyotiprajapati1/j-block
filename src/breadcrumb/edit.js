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
import { useBlockProps } from '@wordpress/block-editor';

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

import { useState, Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls, AlignmentControl, PanelColorSettings } from '@wordpress/block-editor';
import { RangeControl, PanelBody, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( props ) {
	const { setAttributes, attributes } = props;
	const { seperator, textAlign, textColor, linkColor, separatorColor, textSize  } = attributes;

	const linkColorSettings = [
    {
      value: linkColor,
      onChange: (colorValue) => setAttributes({ linkColor: colorValue }),
      label: __("Link Color", "experimental-block"),
    },
  ];

	const textColorSettings = [
    {
      value: textColor,
      onChange: (colorValue) => setAttributes({ textColor: colorValue }),
      label: __("Text Color", "experimental-block"),
    },
  ];

	const separatorColorSettings = [
    {
      value: separatorColor,
      onChange: (colorValue) => setAttributes({ separatorColor: colorValue }),
      label: __("Text Color", "experimental-block"),
    },
  ];


	return (
    <div {...useBlockProps()}>
      <Fragment>
        <BlockControls>
          <AlignmentControl
            value={textAlign}
            onChange={(nextAlign) => {
              setAttributes({ textAlign: nextAlign });
            }}
          />
        </BlockControls>
        <InspectorControls>
          <PanelBody title={__("Breadcrumb Options", "experimental-block")}>
            <TextControl
              label="Separator"
              value={seperator}
              onChange={(value) =>
                setAttributes({
                  seperator: value,
                })
              }
            />
            <RangeControl
              label={__("Font Size", "experimental-block")}
              onChange={(value) => setAttributes({ textSize: value })}
              shiftStep={1}
              min={2}
              max={100}
              value={textSize}
            />
          </PanelBody>
          <PanelColorSettings
            title={__("Link Color", "experimental-block")}
            colorSettings={linkColorSettings}
            initialOpen={false}
          />
          <PanelColorSettings
            title={__("Text Color", "experimental-block")}
            colorSettings={textColorSettings}
            initialOpen={false}
          />
          <PanelColorSettings
            title={__("Separator Color", "experimental-block")}
            colorSettings={separatorColorSettings}
            initialOpen={false}
          />
        </InspectorControls>
      </Fragment>
      <ServerSideRender
        block="experimental-block/breadcrumb"
        attributes={props.attributes}
      />
    </div>
  );
}
