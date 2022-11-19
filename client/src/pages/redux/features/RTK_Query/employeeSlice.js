import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const employeesAdapter = createEntityAdapter();

const initialState = employeesAdapter.getInitialState();

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
      transformResponse: (responseData) => {
        //sort by dateCreated
        responseData.sort((a, b) => {
          return new Date(b.dateCreated) - new Date(a.dateCreated);
        });
        responseData.forEach((employee) => {
          employee.id = employee._id;
        });
        return employeesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Employee", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Employee", id })),
      ],
    }),

    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "/employees",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    //optimistic update
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/employees`,
        method: "PUT",
        body: employee,
      }),
      async onQueryStarted(employee, { dispatch, queryFulfilled }) {
        const employeeResult = dispatch(
          employeesApiSlice.util.updateQueryData(
            "getEmployees",
            undefined,
            (draft) => {
              const index = draft.ids.indexOf(employee.id);
              if (index !== -1) {
                draft.entities[employee.id] = employee;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          if (employeeResult) {
            employeeResult.undo();
          }
        }
      },
    }),
    deleteEmployee: builder.mutation({
      query: (employee) => ({
        url: `/employees`,
        method: "DELETE",
        body: employee,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApiSlice;

// returns the query result object
export const selectEmployeesResult =
  employeesApiSlice.endpoints.getEmployees.select();

// Creates memoized selector
const selectEmployeesData = createSelector(
  selectEmployeesResult,
  (EmployeesResult) => EmployeesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructurlng
export const {
  selectAll: selectAllEmployees,
  selectById: selectEmployeeById,
  selectIds: selectEmployeeIds,
  // Pass in a selector that returns the posts slice of state
} = employeesAdapter.getSelectors(
  (state) => selectEmployeesData(state) ?? initialState
);
