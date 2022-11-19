import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useMarker = (id) => {
  // Access the client
  function getMarker() {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/markers/${id}`)
      .then((res) => res.data);
  }

  // Queries
  return useQuery(["marker", id], getMarker);
};
export default useMarker;
