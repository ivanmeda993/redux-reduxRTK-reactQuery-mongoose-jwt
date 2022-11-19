import React, { useState } from "react";
import TableActions from "./TableActions";
import SearchInput from "../../../../../components/inputs/SerachInput";
import UserRow from "./UserRow";
import UserTableHead from "./UserTableHead";
import GrayBtn from "../../../../../components/btn/GrayBtn";
import { useDispatch, useSelector } from "react-redux";
import { addUserModal } from "../../../app/modalSlice";
import { selectEmployeeIds } from "../employeeSlice";
import LoadingModal from "../../../../../components/modals/loadingModal";

const UserTable = ({ isLoading }) => {
  const dispatch = useDispatch();
  const employeesIds = useSelector(selectEmployeeIds);

  if (isLoading) return <LoadingModal />;
  return (
    <div className="">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-8">
        <div className="flex justify-between items-center py-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-4">
            {/*<TableActions />*/}
            <GrayBtn text="Add" onClick={() => dispatch(addUserModal())} />
          </div>
          {/*<SearchInput />*/}
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <UserTableHead />
          <tbody>
            {employeesIds.map((employeeId) => (
              <UserRow key={employeeId} employeeId={employeeId} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
