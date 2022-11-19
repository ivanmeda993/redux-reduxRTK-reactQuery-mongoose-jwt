import React, { useState } from "react";
import ClusterMap from "./Map";
import useMarkers from "./hooks/useMarkers";

import HoverBtn from "../../../components/btn/HoverBtn";

import useSaveMarker from "./hooks/useAddMarker";
import { Outlet } from "react-router-dom";
import useMarker from "./hooks/useMarker";

const Locations = () => {
  const { data, isLoading, isError } = useMarkers();

  const { data: markerData } = useMarker("60a1b1f1b9d1b30015b1b1d8");

  const { mutate } = useSaveMarker();
  const [marker, setMarker] = useState(null);

  //if location add new marker
  const handleAddNewMaker = () => {
    mutate({
      name: marker.name,
      description: marker.description,
      longitude: marker.lng,
      latitude: marker.lat,
    });
    setMarker(null);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  console.log("marker", marker);

  return (
    <>
      <div className="w-full">
        <div className="flex content-center h-screen justify-center items-center relative">
          <ClusterMap data={data} setMarker={setMarker} marker={marker} />
          {marker && (
            <HoverBtn
              text="Add Marker"
              className="absolute bottom-12 right-6 w-[200px] items-center justify-center"
              onClick={handleAddNewMaker}
            />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Locations;
