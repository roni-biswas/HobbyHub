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
import Loading from "../components/Loading";

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
        loader: () => fetch("http://localhost:3000/groups"),
        hydrateFallbackElement: <Loading />,
      },
      // authentication/authorization route
      {
        path: "create-group",
        element: (
          <PrivetRoute>
            <CreateGroup />
          </PrivetRoute>
        ),
      },
      {
        path: "/my-group/:email",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/groupsByEmail/${params.email}`),
        element: (
          <PrivetRoute>
            <MyGroups />
          </PrivetRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/group-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/groupsById/${params.id}`),
        element: (
          <PrivetRoute>
            <GroupDetails />
          </PrivetRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/update-group/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/groupsById/${params.id}`),
        element: (
          <PrivetRoute>
            <UpdateGroup />
          </PrivetRoute>
        ),
        hydrateFallbackElement: <Loading />,
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
