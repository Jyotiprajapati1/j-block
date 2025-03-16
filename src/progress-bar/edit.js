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
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
import { useEffect, useRef, Fragment } from "@wordpress/element";
import {
  InspectorControls,
  BlockControls,
  AlignmentControl,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { RangeControl, PanelBody, SelectControl } from "@wordpress/components";
import ProgressBar from "progressbar.js";

export default function Edit(props) {
  const { setAttributes, attributes } = props;
  const {
    textAlign,
    progressBarType,
    progressNum,
    progressBarColor,
    progressBarPathColor,
    progressBarWidth,
    progressBarStrokeWidth,
    progressBarTrialWidth

  } = attributes;

  // Create a ref for the progress bar container
  const progressBarContainer = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (progressBarContainer.current) {
      // Initialize the ProgressBar instance

      if (progressBarType == "circle") {
        progressBarRef.current = new ProgressBar.Circle(
          progressBarContainer.current,
          {
            strokeWidth: progressBarStrokeWidth,
            easing: "easeInOut",
            duration: 1400,
            color: progressBarColor || "#FFEA82",
            trailColor: progressBarPathColor || "#eee",
            trailWidth: progressBarTrialWidth,
            svgStyle: { width: progressBarWidth, height: progressBarWidth },
          }
        );
      } else {
        progressBarRef.current = new ProgressBar.Line(
          progressBarContainer.current,
          {
            strokeWidth: progressBarStrokeWidth,
            easing: "easeInOut",
            duration: 1400,
            color: progressBarColor || "#FFEA82",
            trailColor: progressBarPathColor || "#eee",
            trailWidth: progressBarTrialWidth,
            svgStyle: { width: `${progressBarWidth}px`, height: "100%" },
          }
        );
      }

      // Animate the progress bar to the current value
      progressBarRef.current.animate(progressNum / 100);
    }

    // Clean up the ProgressBar instance when the component unmounts
    return () => {
      if (progressBarRef.current) {
        progressBarRef.current.destroy();
      }
    };
  }, [
    progressBarColor,
    progressBarPathColor,
    progressNum,
    progressBarWidth,
    progressBarType,
    progressBarStrokeWidth,
    progressBarTrialWidth
  ]); // Add dependencies here

  const progressBarOption = [
    { label: "Line", value: "line" },
    { label: "Circle", value: "circle" },
  ];

  return (
    <div {...useBlockProps()}>
      <Fragment>
        {/* <BlockControls>
          <AlignmentControl
            value={textAlign}
            onChange={(nextAlign) => {
              setAttributes({ textAlign: nextAlign });
            }}
          />
        </BlockControls> */}
        <InspectorControls>
          <PanelBody title={__("Counter", "experimental-block")}>
            <SelectControl
              label={__("Progress Bar Type", "experimental-block")}
              value={progressBarType}
              options={progressBarOption}
              onChange={(value) => setAttributes({ progressBarType: value })}
            />
            {progressBarType === "line" && (
              <RangeControl
                label={__("Width", "experimental-block")}
                onChange={(value) => setAttributes({ progressBarWidth: value })}
                shiftStep={1}
                min={20}
                max={1000}
                value={progressBarWidth}
              />
            )}
            {progressBarType === "circle" && (
              <RangeControl
                label={__("Diameter", "experimental-block")}
                onChange={(value) => setAttributes({ progressBarWidth: value })}
                shiftStep={1}
                min={20}
                max={1000}
                value={progressBarWidth}
              />
            )}
            
            <RangeControl
              label={__("Progress Number", "experimental-block")}
              onChange={(value) => setAttributes({ progressNum: value })}
              shiftStep={1}
              min={2}
              max={100}
              value={progressNum}
            />

             <RangeControl
              label={__("Bar Width", "experimental-block")}
              onChange={(value) => setAttributes({ progressBarStrokeWidth: value })}
              min={1}
              max={100}
              value={progressBarStrokeWidth}
            />

            <RangeControl
                label={__("Trial Width", "experimental-block")}
                onChange={(value) => setAttributes({ progressBarTrialWidth: value })}
                min={1}
                max={100}
                value={progressBarTrialWidth}
              />

            <PanelColorSettings
              className={"custom-book-button-panel-style"}
              colorSettings={[
                {
                  value: progressBarColor,
                  onChange: (colorValue) =>
                    setAttributes({ progressBarColor: colorValue }),
                  label: __("Bar Color", "experimental-block"),
                },
                {
                  value: progressBarPathColor,
                  onChange: (colorValue) =>
                    setAttributes({ progressBarPathColor: colorValue }),
                  label: __("Path Color", "experimental-block"),
                },
              ]}
              initialOpen={false}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>

      <div style={{ textAlign: textAlign }}>
        <div className="progressbar-item" ref={progressBarContainer}></div>
      </div>
    </div>
  );
}
