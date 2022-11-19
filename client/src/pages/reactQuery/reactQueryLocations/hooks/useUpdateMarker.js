import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const updateMarkerApi = async (marker) =>
  axios
    .put(`${process.env.REACT_APP_API_URL}/markers`, marker)
    .then((res) => res.data);

export default function useUpdateMarker() {
  const queryClient = useQueryClient();
  return useMutation(updateMarkerApi, {
    onMutate: (marker) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryClient.cancelQueries(["markers"]);

      // Snapshot the previous value
      const previousMarkers = queryClient.getQueryData(["markers"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["markers"], (old) => {
        return old.map((m) => {
          if (m._id === marker._id) {
            return { ...m, ...marker };
          }
          return m;
        });
      });

      // Return a context object with the snapshotted value
      return { previousMarkers };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["markers"]);
      console.log(data);
      toast.success("Marker updated successfully", {
        position: "top-right",
      });
    },
  });
}
