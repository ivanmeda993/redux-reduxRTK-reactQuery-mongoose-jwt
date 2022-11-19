import React from "react";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
const Geocoder = ({ setMarker }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAP_TOKEN,
    marker: false,
    collapsed: true,
    placeholder: "Search for a place",
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    console.log("result", e.result);
    const coords = e.result.geometry.coordinates;
    setMarker({ lng: coords[0], lat: coords[1], name: e.result.place_name });
  });

  return null;
};

export default Geocoder;
