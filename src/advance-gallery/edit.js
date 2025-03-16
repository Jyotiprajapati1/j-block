import { __ } from "@wordpress/i18n";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  useBlockProps,
  MediaPlaceholder,
  InspectorControls,
  BlockControls,
  MediaReplaceFlow,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import "./editor.scss";

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    images,
    column,
    imageSize,
    masonry,
    linkTo,
    imageHeight,
    imageGap,
    enablePopup,
  } = attributes;

  const options = [
    { label: "Large", value: "large" },
    { label: "Thumbnail", value: "thumbnail" },
    { label: "Medium", value: "medium" },
    { label: "Fullsize", value: "fullsize" },
  ];
  const linkOptions = [
    { label: "MediaFile", value: "mediaFile" },
    { label: "Attachment", value: "attachment" },
  ];

  const ALLOWED_MEDIA_TYPES = ["image"];
  const hasImages = images && images.length > 0;

  const onSelectImages = (selectedImages) => {
    const imageList = selectedImages.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt || "",
    }));
    setAttributes({ images: imageList });
  };

  const onSelectMedia = (newImages) => {
    const imageList = newImages.map((image) => ({
      id: image.id,
      url: image.url,
      alt: image.alt || "",
    }));
    setAttributes({ images: imageList });
  };

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__("Gallery Settings", "experimental-block")}>
          <RangeControl
            label={__("No. of Columns", "experimental-block")}
            value={column}
            onChange={(newColumn) => setAttributes({ column: newColumn })}
            min={1}
            max={6}
          />
          <RangeControl
            label={__("Gap", "experimental-block")}
            value={imageGap}
            onChange={(gap) => setAttributes({ imageGap: gap })}
            min={0}
            max={200}
          />
          {/* <SelectControl
            label={__("Select Image Size")}
            value={imageSize}
            options={options}
            onChange={(newOption) => setAttributes({ imageSize: newOption })}
          /> */}

          <ToggleControl
            label={__("Enable Masonry Layout","experimental-block")}
            checked={masonry}
            onChange={(isMasonry) => setAttributes({ masonry: isMasonry })}
          />
          {!masonry && (
            <RangeControl
              label={__("Image Height", "experimental-block")}
              value={imageHeight}
              onChange={(newHeight) =>
                setAttributes({ imageHeight: newHeight })
              }
              min={50}
              max={500}
            />
          )}
          <ToggleControl
            label={__("Enable Magnific Popup","experimental-block")}
            checked={enablePopup}
            onChange={(isPopup) => setAttributes({ enablePopup: isPopup })}
          />
          {/* {enablePopup && (
            <SelectControl
              label={__("Link To")}
              value={linkTo}
              options={linkOptions}
              onChange={(newOption) => setAttributes({ linkTo: newOption })}
            />
          )} */}
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <MediaReplaceFlow
          allowedTypes={ALLOWED_MEDIA_TYPES}
          accept="image/*"
          onSelect={onSelectMedia}
          name={__("Replace Images","experimental-block")}
          multiple={true}
          mediaIds={images.map((image) => image.id)}
          addToGallery={hasImages}
        />
      </BlockControls>
      {hasImages ? (
        masonry ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: column }}
          >
            <Masonry gutter={`${imageGap}px`}>
              {images.map((image) => (
                <div key={image.id} className="gallery-item">
                  <a>
                    <img
                      src={image.url}
                      alt={image.alt}
                      style={{ width: "100%", margin: 0, display: "block" }}
                    />
                  </a>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <div
            className={`grid-layout ${imageSize || ""}`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${column}, 1fr)`,
              gap: `${imageGap}px`,
            }}
          >
            {images.map((image) => (
              <div key={image.id} className="gallery-item">
                <a>
                  <img
                    src={image.url}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: `${imageHeight}px`,
                      objectFit: "cover",
                      margin: 0,
                      display: "block",
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        )
      ) : (
        <MediaPlaceholder
          onSelect={onSelectImages}
          allowedTypes={ALLOWED_MEDIA_TYPES}
          multiple
          gallery
          labels={{
            title: __("Add Gallery Images", "experimental-block"),
          }}
        />
      )}
    </div>
  );
}
