import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    images,
    column,
    imageSize,
    masonry,
    imageHeight,
    imageGap,
    enablePopup,
  } = attributes;

  const blockProps = useBlockProps.save();

  const renderImage = (image) => {
    const img = (
      <img
        src={image.url}
        alt={image.alt}
        className={`wp-image-${image.id}`}
        style={{
          width: "100%",
          height: masonry ? "auto" : `${imageHeight}px`,
          objectFit: masonry ? "initial" : "cover",
          margin: 0, 
          display: "block",
        }}
      />
    );

    return enablePopup ? <a href={image.url}>{img}</a> : img;
  };

  if (!images || images.length === 0) {
    return null;
  }

  if (masonry) {
    return (
      <div {...blockProps}>
        <div
          className="masonry-grid"
          style={{
            columnCount: column,
            columnGap: `${imageGap}px`,
            WebkitColumnCount: column,
            MozColumnCount: column,
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className={`masonry-item size-${imageSize}`}
              style={{
                breakInside: "avoid",
                marginBottom: `${imageGap}px`,
              }}
            >
              {renderImage(image)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div {...blockProps}>
      <div
        className={`grid-layout ${imageSize || ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${column}, 1fr)`, 
          gap: `${imageGap}px`,
        }}
      >
        {images.map((image) => (
          <div key={image.id} className={`gallery-item size-${imageSize}`}>
            {renderImage(image)}
          </div>
        ))}
      </div>
    </div>
  );
}
