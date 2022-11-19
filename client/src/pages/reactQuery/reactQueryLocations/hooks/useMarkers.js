import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMarkers = () => {
  // Access the client
  function getMarkers() {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/markers`)
      .then((res) => res.data);
  }

  // Queries
  return useQuery(["markers"], getMarkers);
};
//get single marker

export default useMarkers;
