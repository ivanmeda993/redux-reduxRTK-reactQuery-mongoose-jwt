import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./pages/redux/app/store";
import { BrowserRouter } from "react-router-dom";
import { fetchUsers } from "./pages/redux/features/asyncThunkUsers/asyncUsersSlice";
import { fetchPosts } from "./pages/redux/features/asyncThunkPosts/asyncPostsSlice";
import { ToastContainer } from "react-toastify";
import { employeesApiSlice } from "./pages/redux/features/RTK_Query/employeeSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

//  fetch users and posts on app load, redux toolkit query
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

//  fetch employees on app load, redux RTK query
store.dispatch(employeesApiSlice.endpoints.getEmployees.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
