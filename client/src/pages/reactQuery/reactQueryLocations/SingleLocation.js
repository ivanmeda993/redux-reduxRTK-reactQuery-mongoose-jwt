import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import GrayBtn from "../../../components/btn/GrayBtn";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/20/solid";
import useDeleteMarker from "./hooks/useDeleteMarker";

const SingleLocation = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    ["markers", locationId],
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/markers/${locationId}`)
        .then((res) => res.data),
    {
      staleTime: Infinity,
    }
  );

  const { mutate: deleteMarker } = useDeleteMarker();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  const handleDelete = () => {
    deleteMarker({ id: locationId });
  };

  return (
    <div className="w-full">
      <div className="flex content-center h-screen justify-center items-center relative">
        <div className="flex flex-col ">
          <span>{data.name}</span>
          <span>Latitude: {data.latitude}</span>
          Longitude: {data.longitude}
          <div className="flex gap-4 w-full items-center justify-between">
            <GrayBtn
              onClick={() => navigate(`/react-query/locations`)}
              text="Back"
              className="mt-4 w-[200px] items-center justify-between"
              icon={<ArrowLeftIcon className="w-6 h-6 " />}
            />
            <GrayBtn
              onClick={handleDelete}
              text="Delete"
              className="mt-4 w-[200px] items-center justify-between"
              icon={<TrashIcon className="w-6 h-6 " />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLocation;
