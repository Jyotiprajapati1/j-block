/**
 * External dependencies
 */

import { dropRight, times } from "lodash";

import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
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


// Default theme
import '@splidejs/react-splide/css';

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
const ALLOWED_BLOCKS = ["experimental-block/team"];
const TEMPLATE = [["experimental-block/team"], ["experimental-block/team"], ["experimental-block/team"]];

function TeamsEditContainer({
  attributes,
  setAttributes,
  updateColumns,
  clientId,
}) {
  
  const { numColumn } = attributes;
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

  return (
    <>
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody>
          <RangeControl
            label={__("Number of Teams", "experimental-block")}
            value={count}
            onChange={(value) => updateColumns(count, value)}
            min={1}
            max={Math.max(10, count)}
          />
          <RangeControl
              label={__("Number of Columns", "experimental-block")}
              value={numColumn}
              onChange={(value) => setAttributes({ numColumn: value })} 
              min={1}
              max={3} 
          />
        </PanelBody>
      </InspectorControls>

      <div className={ "experimental-block-teams " + "col"+numColumn }>
      { innerBlocksProps.children }
      </div>

      
    </div>
    </>
  );
}

const TeamsEditContainerWrapper = withDispatch(
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
            return createBlock("experimental-block/team");
          }),
        ];
      } else {
        // The removed column will be the last of the inner blocks.
        innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);
      }
      
      replaceInnerBlocks(clientId, innerBlocks);

    },
  })
)(TeamsEditContainer);

const TeamsEdit = (props) => {
  const Component = TeamsEditContainerWrapper;

  return <Component {...props} />;
};

export default TeamsEdit;
