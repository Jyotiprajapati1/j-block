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

import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls, AlignmentControl, PanelColorSettings } from '@wordpress/block-editor';
import { RangeControl, PanelBody, TextControl } from '@wordpress/components';


export default function Edit( props ) {

	const { setAttributes, attributes } = props;
	const { textAlign, counter, delayTime } = attributes;

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
          <PanelBody title={__("Counter", "experimental-block")}>
            <TextControl
              label={__("Counter","Counter Number", "experimental-block")}
              value={counter}
              onChange={(value) =>
                setAttributes({
                  counter: value,
                })
              }
            />
            <RangeControl
              label={__("Delay Time", "experimental-block")}
              value={delayTime}
              onChange={(newtime) => setAttributes({ delayTime: newtime })}
              min={5}
              max={100}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
      <div className="wptravel-blocks-counter" style={{ textAlign: textAlign }}>
        <span className="counter-item">{counter}</span>
      </div>
    </div>
  );
}
