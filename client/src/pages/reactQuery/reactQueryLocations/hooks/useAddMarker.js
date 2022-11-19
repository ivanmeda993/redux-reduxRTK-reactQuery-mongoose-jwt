import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const addMarkerApi = async (marker) =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/markers`, marker)
    .then((res) => res.data);

export default function useSaveMarker() {
  const queryClient = useQueryClient();
  return useMutation(addMarkerApi, {
    onMutate: (marker) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryClient.cancelQueries(["markers"]);

      // Snapshot the previous value
      const previousMarkers = queryClient.getQueryData(["markers"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["markers"], (old) => [...old, marker]);

      // Return a context object with the snapshotted value
      return { previousMarkers };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["markers"]);
      console.log(data);
      toast.success("Marker added successfully", {
        position: "top-right",
      });
    },
  });
}
