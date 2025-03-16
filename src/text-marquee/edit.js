import { __ } from "@wordpress/i18n";
import $ from "jquery";
import "jquery.marquee";
import {
  useBlockProps,
  InspectorControls,
  FontSizePicker,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  RangeControl,
  TextControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { Fragment, useEffect, useRef } from "@wordpress/element";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const {
    fontSize,
    fontAppearance,
    letterSpacing,
    decoration,
    letterCase,
    fontWeight,
    speed,
    pauseOnHover,
    textColor,
    inputs,
    inputGap,
  } = attributes;

  const textStyle = {
    fontSize: `${fontSize}px`,
    fontStyle: `${fontAppearance}`,
    fontWeight: `${fontWeight}`,
    letterSpacing: `${letterSpacing}px`,
    textDecoration: `${decoration}`,
    textTransform: `${letterCase}`,
    color: `${textColor}`,
  };

  const slideSpeed = speed * 1000;
  const el = useRef();

  useEffect(() => {
    const $el = $(el.current);
  
    if (!$el.data('marquee-initialized')) {
      $el.text(inputs);
      $el.marquee({
        duration: slideSpeed,
        gap: inputGap,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: pauseOnHover,
      });
  
      $el.find(".js-marquee, .js-marquee-wrapper span").css(textStyle);
  
      $el.data('marquee-initialized', true); 
    } else {
      $el.marquee("update", {
        duration: slideSpeed,
        gap: inputGap,
        pauseOnHover: pauseOnHover,
      });
  
      $el.find(".js-marquee, .js-marquee-wrapper span").css(textStyle);
    }
  
    return () => {
      if ($el.data('marquee-initialized')) {
        $el.marquee("destroy");
        $el.data('marquee-initialized', false); 
      }
    };
  }, [inputs, slideSpeed, inputGap, pauseOnHover, textStyle]);
  
  return (
    <div {...useBlockProps()}>
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Input Settings", "experimental-block")}
            initialOpen={true}
          >
            <PanelColorSettings
              title={__("Color Settings", "experimental-block")}
              colorSettings={[
                {
                  label: __("Text Color", "experimental-block"),
                  value: textColor,
                  onChange: (newColor) =>
                    setAttributes({ textColor: newColor }),
                },
              ]}
              initialOpen={false}
            />
            <TextControl
              label={__("Input", "experimental-block")}
              value={inputs}
              onChange={(newInput) => setAttributes({ inputs: newInput })}
              placeholder={__("Enter text here...", "experimental-block")}
            />
          </PanelBody>

          <PanelBody
            title={__("Typography Settings", "experimental-block")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Font Size", "experimental-block")}
              value={fontSize}
              onChange={(newSize) => setAttributes({ fontSize: newSize })}
              min={10}
              max={1000}
            />

            <SelectControl
              label={__("Font Style", "experimental-block")}
              value={fontAppearance}
              options={[
                { label: "Normal", value: "normal" },
                { label: "Italic", value: "italic" },
              ]}
              onChange={(style) => setAttributes({ fontAppearance: style })}
            />

            <SelectControl
              label={__("Font Weight", "experimental-block")}
              value={fontWeight}
              options={[
                { label: __("Thin", "experimental-block"), value: "100" },
                {
                  label: __("Extra Light", "experimental-block"),
                  value: "200",
                },
                { label: __("Light", "experimental-block"), value: "300" },
                { label: __("Normal", "experimental-block"), value: "400" },
                { label: __("Medium", "experimental-block"), value: "500" },
                {
                  label: __("Semi Bold", "experimental-block"),
                  value: "600",
                },
                { label: __("Bold", "experimental-block"), value: "700" },
                {
                  label: __("Extrabold", "experimental-block"),
                  value: "800",
                },
                { label: __("Black", "experimental-block"), value: "900" },
              ]}
              onChange={(weight) => setAttributes({ fontWeight: weight })}
            />

            <RangeControl
              label={__("Letter Spacing", "experimental-block")}
              value={letterSpacing}
              onChange={(spacing) => setAttributes({ letterSpacing: spacing })}
              min={0}
              max={100}
            />

            <SelectControl
              label={__("Text Decoration", "experimental-block")}
              value={decoration}
              options={[
                { label: "None", value: "none" },
                { label: "Underline", value: "underline" },
                { label: "Overline", value: "overline" },
                { label: "Line-through", value: "line-through" },
              ]}
              onChange={(dec) => setAttributes({ decoration: dec })}
            />

            <SelectControl
              label={__("Text Transform", "experimental-block")}
              value={letterCase}
              options={[
                { label: "None", value: "none" },
                { label: "Uppercase", value: "uppercase" },
                { label: "Lowercase", value: "lowercase" },
                { label: "Capitalize", value: "capitalize" },
              ]}
              onChange={(transform) => setAttributes({ letterCase: transform })}
            />
          </PanelBody>

          {/* Animation Settings */}
          <PanelBody
            title={__("Animation Settings", "experimental-block")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Speed", "experimental-block")}
              value={speed}
              onChange={(newSpeed) => setAttributes({ speed: newSpeed })}
              min={1}
              max={20}
            />
            <RangeControl
              label={__("Gap between input", "experimental-block")}
              value={inputGap}
              onChange={(newGap) => setAttributes({ inputGap: newGap })}
              min={0}
              max={200}
            />

            <ToggleControl
              label={__("Pause on Hover", "experimental-block")}
              checked={pauseOnHover}
              onChange={(pause) => setAttributes({ pauseOnHover: pause })}
            />
          </PanelBody>
        </InspectorControls>

        <div ref={el}>
          <span style={textStyle}>
            {inputs || __("Block content", "experimental-block")}
          </span>
        </div>
      </Fragment>
    </div>
  );
}
