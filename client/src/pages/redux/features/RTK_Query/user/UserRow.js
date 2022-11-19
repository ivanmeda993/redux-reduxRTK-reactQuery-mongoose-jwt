import { PencilIcon, TrashIcon, UserIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserModal } from "../../../app/modalSlice";
import {
  selectEmployeeById,
  useDeleteEmployeeMutation,
} from "../employeeSlice";
import LoadingModal from "../../../../../components/modals/loadingModal";
import { toast } from "react-toastify";

function UserRow({ employeeId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => selectEmployeeById(state, employeeId));
  const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();

  let handleDelete = async () => {
    try {
      await deleteEmployee({ id: user.id }).unwrap();
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    }
  };
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4 w-4 ">
          <div className="flex items-center ">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <UserIcon className="w-10 h-10 rounded-full" />
          <div className="pl-3">
            <div className="text-base font-semibold">{user.name}</div>
            <div className="font-normal text-gray-500">{user.email}</div>
          </div>
        </th>
        <td className="py-4 px-6">{user.position}</td>
        <td className="py-4 px-6">{user.role}</td>
        <td className="py-4 px-6">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full  mr-2 ${
                {
                  Sick: "bg-red-500",
                  Available: "bg-green-500",
                  Busy: "bg-yellow-500",
                  Vacation: "bg-red-500",
                }[user.status]
              }`}
            ></div>
            {user.status}
          </div>
        </td>
        <td className="py-4 px-6 flex items-center justify-center gap-4">
          <PencilIcon
            className="smallIcon w-6 h-6 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer hover:text-blue-500"
            onClick={() => dispatch(editUserModal(user.id))}
          />
          <TrashIcon
            className="smallIcon w-6 h-6 font-medium text-red-600/70 dark:text-blue-500 hover:underline cursor-pointer hover:text-red-500"
            onClick={() => handleDelete()}
          />
        </td>
      </tr>
      {isLoading && <LoadingModal />}
    </>
  );
}
export default UserRow;
