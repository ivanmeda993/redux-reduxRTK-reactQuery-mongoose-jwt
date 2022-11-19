import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const deleteMarkerApi = async (id) =>
  axios
    .delete(`${process.env.REACT_APP_API_URL}/markers`, { data: id })
    .then((res) => res.data);

export default function useDeleteMarker() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(deleteMarkerApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["markers"]);
      console.log(data);
      navigate("/react-query/locations");
      toast.success("Marker deleted successfully", {
        position: "top-right",
      });
    },
  });
}
