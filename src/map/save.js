/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
  const { zoom, mapHeight, maps, location, apiKey } = attributes;

  // Render Google Map
  if (maps === "googleMap") {
    return (
      <div {...useBlockProps.save()}>
        <iframe
          title="Google Map"
          height={mapHeight}
          width={"100%"}
          frameBorder={0}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            location
          )}&output=embed&hl=english&z=${zoom}`}
        ></iframe>
      </div>
    );
  }

  if (maps === "hereMap") {
    return (
      <div {...useBlockProps.save()}>
        <div 
          className="here-map" 
          data-location={encodeURIComponent(location)}
          data-zoom={zoom}
          data-height={mapHeight}
          data-api-key={apiKey}  
          style={{
            width: "100%",
            height: `${mapHeight}px`,
          }}
        />
      </div>
    );
  }

  return <div {...useBlockProps.save()} />;
}
