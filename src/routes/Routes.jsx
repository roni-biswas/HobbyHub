import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import PrivetRoute from "./PrivetRoute";
import CreateGroup from "../pages/CreateGroup";
import MyGroups from "../pages/MyGroups";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GroupDetails from "../pages/GroupDetails";
import UpdateGroup from "../pages/UpdateGroup";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-groups",
        Component: AllGroups,
      },
      // authentication/authorization route
      {
        path: "create-group",
        element: (
          // <PrivetRoute>
          <CreateGroup />
          // </PrivetRoute>
        ),
      },
      {
        path: "my-group",
        element: (
          // <PrivetRoute>
          <MyGroups />
          // </PrivetRoute>
        ),
      },
      {
        path: "group-details",
        element: (
          // <PrivetRoute>
          <GroupDetails />
          // </PrivetRoute>
        ),
      },
      {
        path: "update-group",
        element: (
          // <PrivetRoute>
          <UpdateGroup />
          // </PrivetRoute>
        ),
      },
      // user login/registration
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
