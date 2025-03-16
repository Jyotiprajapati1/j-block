/**
 * External dependencies
 */

import { dropRight, times } from "lodash";

import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  ToggleControl
} from "@wordpress/components";

import {
  InspectorControls,
  useInnerBlocksProps,
  __experimentalBlockVariationPicker,
  useBlockProps,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { withDispatch, useSelect, select, subscribe } from "@wordpress/data";

import {
  createBlock,
  store as blocksStore,
} from "@wordpress/blocks";

import { Splide, SplideTrack } from '@splidejs/react-splide';

import '@splidejs/react-splide/css/core';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";


/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ["experimental-block/slides"];
const TEMPLATE = [["experimental-block/slides"], ["experimental-block/slides"]];

function SliderEditContainer({
  attributes,
  setAttributes,
  updateColumns,
  clientId,
}) {

  const { perPage, autoPlay, showDots, showArrow } = attributes;

  const { count } = useSelect(
    (select) => {
      return {
        count: select(blockEditorStore).getBlockCount(clientId),
      };
    },
    [clientId]
    );


  const getBlockList = () => select("core/editor").getBlocks();
  let blockList = getBlockList();
  subscribe(() => {
    const newBlockList = getBlockList();
    const blockListChanged = newBlockList !== blockList;
    blockList = newBlockList;
    if (blockListChanged) {
      const changeEvent = new Event("elementsChanged");
      document.dispatchEvent(changeEvent);
    }
  });

  const blockProps = useBlockProps();
  
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    orientation: "horizontal",
    renderAppender: false,
    template: TEMPLATE,
  });

  if( count > 10 ){
    updateColumns(count, 3)
  }

  return (
    <>
      <InspectorControls>
        <PanelBody>
            <ToggleControl
                label={__('Auto Play', 'experimental-block')}
                checked={autoPlay}
                onChange={() => setAttributes({ autoPlay: !autoPlay })}
            />
						<ToggleControl
                label={__('Show Dots', 'experimental-block')}
                checked={showDots}
                onChange={() => setAttributes({ showDots: !showDots })}
            />
						<ToggleControl
                label={__('Show Arrow', 'experimental-block')}
                checked={showArrow}
                onChange={() => setAttributes({ showArrow: !showArrow })}
            />
            <RangeControl
              label={__("Number of Slides", "experimental-block")}
              value={count}
              onChange={(value) => updateColumns(count, value)}
              min={1}
              max={Math.max(10, count)}
            />
            <RangeControl
							label={__('Slide Per Page', 'experimental-block')}
							onChange={(value) => setAttributes({ perPage: value })}
							shiftStep={1}
							min={1}
							max={20}
							value={perPage}
						/>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        
      <Splide 
        hasTrack={ false } 
        aria-label="..."
        options={{
					type       : 'loop',
					perPage    : perPage,
					pagination : showDots,
					arrows     : showArrow,
					gap        : 30,
					autoplay   : autoPlay,
				  }}
      >
        <div className="custom-wrapper">
          <SplideTrack>
          { innerBlocksProps.children }
          </SplideTrack>

        </div>
      </Splide>
      
      </div>
    </>
  );
}

const SliderEditContainerWrapper = withDispatch(
  (dispatch, ownProps, registry) => ({
    /**
     * Update all child Column blocks with a new vertical alignment setting
     * based on whatever alignment is passed in. This allows change to parent
     * to overide anything set on a individual column basis.
     *
     * @param {string} verticalAlignment the vertical alignment setting
     */

    /**
     * Updates the column count, including necessary revisions to child Column
     * blocks to grant required or redistribute available space.
     *
     * @param {number} previousColumns Previous column count.
     * @param {number} newColumns      New column count.
     */

    updateColumns( previousColumns, newColumns ) {

     
      const { clientId } = ownProps;
      const { replaceInnerBlocks } = dispatch(blockEditorStore);
      const { getBlocks } = registry.select(blockEditorStore);

      let innerBlocks = getBlocks(clientId);

      // Redistribute available width for existing inner blocks.
      const isAddingColumn = newColumns > previousColumns;

      if (isAddingColumn) {
        innerBlocks = [
          ...innerBlocks,
          ...times(newColumns - previousColumns, () => {
            return createBlock("experimental-block/slides");
          }),
        ];
      } else {
        // The removed column will be the last of the inner blocks.
        innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);
      }
      
      replaceInnerBlocks(clientId, innerBlocks);

    },
  })
)(SliderEditContainer);

const SliderEdit = (props) => {
  const Component = SliderEditContainerWrapper;

  return <Component {...props} />;
};

export default SliderEdit;
