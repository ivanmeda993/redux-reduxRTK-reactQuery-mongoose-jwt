import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Redux } from "./pages/redux/Redux";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Basic from "./pages/redux/Basic";
import ReactQuery from "./pages/reactQuery/ReactQuery";
import Posts from "./pages/redux/features/toolkitPosts/Posts";
import AsyncPosts from "./pages/redux/features/asyncThunkPosts/AsyncPosts";
import SinglePost from "./pages/redux/features/asyncThunkPosts/SinglePost";
import EditPost from "./pages/redux/features/asyncThunkPosts/EditPost";
import RTK from "./pages/redux/features/RTK_Query/RTK";
import Auth from "./pages/redux/features/auth/Auth";
import RequireAuth from "./pages/redux/features/auth/RequireAuth";
import Layout from "./components/shared/Layout";
import Sidebar from "./components/shared/Sidebar";
import Locations from "./pages/reactQuery/reactQueryLocations/Locations";
import SingleLocation from "./pages/reactQuery/reactQueryLocations/SingleLocation";
import Movies from "./pages/reactQuery/reactQueryInfinityScrollMovies/Movies";
import Users from "./pages/reactQuery/reactQueryPaginatioPosts/Users";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="react-query" element={<Sidebar />}>
          <Route path="" element={<ReactQuery />} />
          <Route path="locations" element={<Layout />}>
            <Route path="" element={<Locations />} />
            <Route path=":locationId" element={<SingleLocation />} />
          </Route>

          <Route path="movies" element={<Movies />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="redux" element={<Sidebar />}>
          <Route path="" element={<Redux />} />
          <Route path="counter" element={<Basic />} />
          <Route path="posts" element={<Posts />} />
          <Route path="async-posts" element={<Layout />}>
            <Route path="" element={<AsyncPosts />} />
            <Route path=":id" element={<SinglePost />} />
            <Route path=":id/edit" element={<EditPost />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="rtk" element={<RTK />} />
          </Route>
          <Route path="auth" element={<Auth />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
