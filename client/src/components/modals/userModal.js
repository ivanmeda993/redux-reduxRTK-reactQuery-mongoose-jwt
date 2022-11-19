import React, { useEffect, useRef, useState } from "react";
import Input from "../inputs/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  selectModalType,
  selectModalUserId,
} from "../../pages/redux/app/modalSlice";
import useOnClickOutside from "../../hooks/useClickOutside";
import {
  selectEmployeeById,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../pages/redux/features/RTK_Query/employeeSlice";
import { toast } from "react-toastify";
import LoadingModal from "./loadingModal";

const UserModal = () => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => dispatch(closeModal()));
  const dispatch = useDispatch();
  const modalType = useSelector(selectModalType);
  const employeeId = useSelector(selectModalUserId);
  const [addEmployee, { isLoading: addLoading }] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading: editLoading }] =
    useUpdateEmployeeMutation();

  const userData = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (userData) {
      setForm(userData);
    }
  }, [employeeId]);

  const { firstname, lastname, email, position, role, status } = form;
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    //  check if form is valid
    if (
      form.firstname === "" ||
      form.lastname === "" ||
      form.email === "" ||
      form.position === "" ||
      form.role === ""
    ) {
      return toast.error("All fields are required");
    }
    try {
      if (modalType === "add") {
        await addEmployee(form).unwrap();
        toast.success("Employee added successfully");
      } else {
        await updateEmployee(form).unwrap();
        toast.success("Employee updated successfully");
      }

      dispatch(closeModal());
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0  h-screen  md:h-full flex bg-black/50 z-50"
      >
        <div
          className="relative w-full max-w-2xl h-full md:h-auto "
          ref={modalRef}
        >
          <form
            onSubmit={onSubmit}
            action="src/components/modals/userModal#"
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {modalType === "add" ? "Add" : "Edit "}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="editUserModal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <Input
                  text="Name"
                  name="firstname"
                  placeholder="John "
                  onChange={onChange}
                  value={firstname}
                />
                <Input
                  text="Lastname"
                  name="lastname"
                  placeholder="Doe"
                  onChange={onChange}
                  value={lastname}
                />
                <Input
                  text="Email"
                  name="email"
                  placeholder="youemail@gmail.com"
                  type="email"
                  onChange={onChange}
                  value={email}
                />
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Select an position
                  </label>
                  <select
                    onChange={onChange}
                    value={position}
                    name="position"
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a position</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Sales</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Select an role
                  </label>
                  <select
                    onChange={onChange}
                    value={role}
                    name="role"
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Select an status
                  </label>
                  <select
                    onChange={onChange}
                    value={status}
                    name="status"
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a status</option>
                    <option value="Sick">Sick</option>
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Vacation">Vacation</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {modalType === "add" ? "Add" : "Save "}
              </button>
            </div>
          </form>
        </div>
      </div>
      {addLoading && <LoadingModal />}
    </>
  );
};
export default UserModal;
