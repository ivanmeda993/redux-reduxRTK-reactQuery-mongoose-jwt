import React from "react";
import UserTable from "./user/UserTable";
import UserModal from "../../../../components/modals/userModal";
import { useDispatch, useSelector } from "react-redux";
import { selectModalStatus } from "../../app/modalSlice";
import { useGetEmployeesQuery } from "./employeeSlice";
import LoadingModal from "../../../../components/modals/loadingModal";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "../auth/authSlice";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";

const RTK = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectModalStatus);
  const { isLoading, isError, isSuccess } = useGetEmployeesQuery();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const tokenAbbr = `${token.slice(0, 9)}...`;

  if (isLoading) return <LoadingModal />;
  else if (isError) return <div>Error...</div>;
  else if (isSuccess)
    return (
      <div className="w-full h-full  flex items-center justify-center   flex-col mt-[100px] ">
        <div>
          <h1 className="text-center text-4xl">RTK/JWT</h1>
          <h2 className="text-center text-2xl">Token: {tokenAbbr}</h2>

          <h2 className="text-center text-2xl">User: {user}</h2>
          <div
            className="w-[300px] flex items-center justify-center mt-6 hover:text-blue-500 cursor-pointer hover:scale-125 transition ease-in "
            onClick={() => dispatch(logout())}
          >
            <ArrowRightOnRectangleIcon text="Logout" className="w-8 h-8  " />
            Logout
          </div>
        </div>
        <UserTable isLoading={isLoading} />
        {isModalOpen && <UserModal />}
      </div>
    );
};

export default RTK;
