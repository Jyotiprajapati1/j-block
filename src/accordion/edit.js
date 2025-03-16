import React, { useEffect, useRef, useState } from "react";
import { dropRight, times } from "lodash";
import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";
import {
  InspectorControls,
  useInnerBlocksProps,
  useBlockProps,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { withDispatch, useSelect, subscribe } from "@wordpress/data";
import Accordion from "accordion-js";
import { createBlock } from "@wordpress/blocks";
import "./editor.scss";
import "accordion-js/dist/accordion.min.css";

// Allowed blocks and template constants
const ALLOWED_BLOCKS = ["experimental-block/accordion-item"];
const TEMPLATE = [
  ["experimental-block/accordion-item"],
  ["experimental-block/accordion-item"],
];

function AccordionEditContainer({
  attributes,
  setAttributes,
  updateColumns,
  clientId,
}) {
  const accordionRef = useRef(null); // Ref for the accordion container
  const accordionInstance = useRef(null);
  const [editingBlockId, setEditingBlockId] = useState(null);


  const { count, blockList } = useSelect(
    (select) => {
      const { getBlockCount, getBlocks } = select(blockEditorStore);
      return {
        count: getBlockCount(clientId),
        blockList: getBlocks(clientId), 
      };
    },
    [clientId]
  );

  const initializeAccordion = () => {
    if (accordionRef.current) {
      if (accordionInstance.current) {
        accordionInstance.current.destroy();
      }
  
      accordionInstance.current = new Accordion(accordionRef.current, {
        duration: 400,
        showMultiple: false,
        onOpen: (currentElement) => {
          const blockId = currentElement.dataset.blockId; 
          setEditingBlockId(blockId);
        },
        onClose: (currentElement) => {
          const blockId = currentElement.dataset.blockId;
          if (editingBlockId === blockId) {
            setEditingBlockId(null);
          }
        },
      });
    }
  };
  
  // Initialize accordion when component or blocks change

  useEffect(() => {
    initializeAccordion();

    // Cleanup function
    return () => {
      if (accordionInstance.current) {
        accordionInstance.current.destroy();
      }
    };
  }, [blockList]);

  // Subscribe to block changes
  useEffect(() => {
    const handleBlockChange = () => {
      const currentBlocks = blockList;
      if (currentBlocks !== blockList) {
        // Reinitialize accordion when blocks change
        initializeAccordion();
      }
    };

    const unsubscribe = subscribe(handleBlockChange);
    return () => unsubscribe();
  }, [blockList]);

  // Handle editing state
  useEffect(() => {
    const handleClick = (e) => {
      const accordionElement = accordionRef.current;
      if (accordionElement && !accordionElement.contains(e.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    orientation: "horizontal",
    renderAppender: false,
    template: TEMPLATE,
    __experimentalBlockAttributes: (block) => ({
      "data-block-id": block.clientId,
    }),
  });
  

  // Initialize Accordion in useEffect
  useEffect(() => {
    if (accordionRef.current) {
      new Accordion(accordionRef.current);
    }
  }, [clientId]); 
  return (
    <>
      <InspectorControls>
        <PanelBody>
          <RangeControl
            label={__("Number of Accordion","experimental-block")}
            value={count}
            onChange={(value) => updateColumns(count, value)}
            min={1}
            max={Math.max(10, count)}
            __nextHasNoMarginBottom={true}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div ref={accordionRef} className="accordion-container">
          {innerBlocksProps.children}
        </div>
      </div>
    </>
  );
}

const AccordionEditContainerWrapper = withDispatch(
  (dispatch, ownProps, registry) => ({
    updateColumns(previousColumns, newColumns) {
      const { clientId } = ownProps;
      const { replaceInnerBlocks } = dispatch(blockEditorStore);
      const { getBlocks } = registry.select(blockEditorStore);

      let innerBlocks = getBlocks(clientId);
      const isAddingColumn = newColumns > previousColumns;

      if (isAddingColumn) {
        innerBlocks = [
          ...innerBlocks,
          ...times(newColumns - previousColumns, () =>
            createBlock("experimental-block/accordion-item")
          ),
        ];
      } else {
        innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);
      }

      replaceInnerBlocks(clientId, innerBlocks);
    },
  })
)(AccordionEditContainer);

const AccordionEdit = (props) => {
  const Component = AccordionEditContainerWrapper;
  return <Component {...props} />;
};

export default AccordionEdit;
