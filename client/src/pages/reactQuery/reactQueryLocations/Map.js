import React, { useRef, useState } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { EyeIcon } from "@heroicons/react/20/solid";
import Geocoder from "./Geocoder";
import { useNavigate } from "react-router-dom";
import useUpdateMarker from "./hooks/useUpdateMarker";
import axios from "axios";

const ClusterMap = ({ data, setMarker, marker }) => {
  const navigate = useNavigate();

  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef();

  const handleMarkerClick = (marker) => {
    if (zoom < 5) {
      setPopupInfo(marker);
      mapRef.current.flyTo({
        center: [marker.longitude, marker.latitude],
        zoom: 15,
      });
    } else {
      setPopupInfo(marker);
    }
  };

  const { mutate } = useUpdateMarker();

  const getAddressByGeolocation = async (latitude, longitude) => {
    return await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`
      )
      .then((res) => res.data.features[0].place_name);
  };
  const handleUpdate = (id, latitude, longitude) => {
    getAddressByGeolocation(latitude, longitude).then((address) => {
      mutate({ id, latitude, longitude, name: address });
    });
  };

  return (
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {data &&
        data.map((marker) => (
          <Marker
            key={marker._id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClick={() => handleMarkerClick(marker)}
            draggable
            onDragEnd={(e) =>
              handleUpdate(marker._id, e.lngLat.lat, e.lngLat.lng)
            }
          />
        ))}

      {marker ? <Marker longitude={marker.lng} latitude={marker.lat} /> : null}
      {popupInfo && (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          maxWidth="auto"
          closeOnClick={false}
          focusAfterOpen={false}
          onClose={() => setPopupInfo(null)}
        >
          <div className="p-4 bg-black/80 rounded-lg">
            <EyeIcon
              className="h-12 w-12 text-green-500 hover:text-green-600 hover:scale-110 cursor-pointer"
              onClick={() =>
                navigate(`/react-query/locations/${popupInfo._id}`)
              }
            />
          </div>
        </Popup>
      )}
      <Geocoder setMarker={setMarker} />
    </ReactMapGL>
  );
};

export default ClusterMap;
