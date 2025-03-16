/**
 * Retrieves the translation of text.
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
} from "@wordpress/components";
import { Fragment, useState, useEffect, useRef } from "@wordpress/element";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const { zoom, mapHeight, maps, location, apiKey } = attributes;
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadHereMapsScripts = async () => {
      try {
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
        await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Error loading HERE Maps scripts:', error);
      }
    };

    if (!window.H) {
      loadHereMapsScripts();
    } else {
      setScriptsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (maps === "hereMap" && apiKey && scriptsLoaded && mapRef.current && window.H) {
      try {
        // Dispose existing map if present
        if (map) {
          map.dispose();
        }
  
        const newPlatform = new window.H.service.Platform({
          apikey: apiKey,
        });
        setPlatform(newPlatform);
  
        const defaultLayers = newPlatform.createDefaultLayers();
  
        const newMap = new window.H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            zoom: zoom,
            center: { lat: 52.53086, lng: 13.38469 },
          }
        );
  
        const behavior = new window.H.mapevents.Behavior(
          new window.H.mapevents.MapEvents(newMap)
        );
  
        setMap(newMap);
  
        return () => newMap.dispose();
      } catch (error) {
        console.error('Error initializing HERE Maps:', error);
      }
    }
  }, [scriptsLoaded, maps, apiKey]); // Add apiKey to dependency array

  useEffect(() => {
    if (maps === "googleMap") {
      setMap(null);
    }
  }, [maps]);

  useEffect(() => {
    if (map) {
      map.setZoom(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    if (platform && map && location) {
      try {
        const service = platform.getSearchService();

        const searchLocation = () => {
          service.geocode(
            { q: location },
            (result) => {
              if (result.items && result.items.length > 0) {
                const position = result.items[0].position;

                map.removeObjects(map.getObjects());
                map.setCenter({ lat: position.lat, lng: position.lng });
                const marker = new window.H.map.Marker({
                  lat: position.lat,
                  lng: position.lng
                });
                map.addObject(marker);
              }
            },
            (error) => {
              console.error('Geocoding error:', error);
            }
          );
        };

        searchLocation();
      } catch (error) {
        console.error('Error searching location:', error);
      }
    }
  }, [location, platform, map]);

  useEffect(() => {
    if (map) {
      map.getViewPort().resize();
    }
  }, [mapHeight, map]);


  const googleMap = (
    <iframe
      title="Google Map"
      height={mapHeight}
      width={"100%"}
      frameBorder={0}
      src={`https://www.google.com/maps?q=${encodeURIComponent(
        location
      )}&output=embed&hl=english&z=${zoom}`}
    ></iframe>
  );

  const hereMap = (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: `${mapHeight}px`,
        maxHeight: "none",
      }}
    />
  );

  const selectedMap = () => {
    switch (maps) {
      case "googleMap":
        return googleMap;
      case "hereMap":
        return hereMap;
      default:
        return null;
    }
  };

  const mapOptions = [
    { label: "Google Map", value: "googleMap" },
    { label: "Here Map", value: "hereMap" },
  ];

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody
          title={__("Map Settings", "experimental-block")}
          initialOpen={true}
        >
          <SelectControl
            label={__("Choose Map", "experimental-block")}
            value={maps}
            options={mapOptions}
            onChange={(newMap) => setAttributes({ maps: newMap })}
          />
          {maps === "hereMap" && (
            <TextControl
              label={__("Enter API Key", "experimental-block")}
              value={apiKey}
              onChange={(newValue) => setAttributes({ apiKey: newValue })}
            />
          )}

          <TextControl
            label={__("Enter Location", "experimental-block")}
            value={location}
            onChange={(newValue) => setAttributes({ location: newValue })}
          />
          <RangeControl
            label={__("Height Of map", "experimental-block")}
            value={mapHeight}
            onChange={(newHeight) => setAttributes({ mapHeight: newHeight })}
            min={1}
            max={1000}
          />
          <RangeControl
            label={__("Zoom", "experimental-block")}
            value={zoom}
            onChange={(newValue) => setAttributes({ zoom: newValue })}
            min={5}
            max={20}
          />
        </PanelBody>
      </InspectorControls>
      {maps === "hereMap" && !apiKey && (
        <div >
          {__("Please provide a valid HERE Maps API key.", "experimental-block")}
        </div>
      )}
      <div>{selectedMap()}</div>
    </div>
  );
}