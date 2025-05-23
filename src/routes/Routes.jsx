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
        handle: { title: "Home page" },
      },
      {
        path: "all-groups",
        Component: AllGroups,
        loader: () => fetch("https://papaya-hobby-server.vercel.app/groups"),
        hydrateFallbackElement: <Loading />,
        handle: { title: "All Groups" },
      },
      // authentication/authorization route
      {
        path: "create-group",
        element: (
          <PrivetRoute>
            <CreateGroup />
          </PrivetRoute>
        ),
        handle: { title: "Create Group" },
      },
      {
        path: "/my-group/:email",
        loader: ({ params }) =>
          fetch(
            `https://papaya-hobby-server.vercel.app/groupsByEmail/${params.email}`
          ),
        element: (
          <PrivetRoute>
            <MyGroups />
          </PrivetRoute>
        ),
        hydrateFallbackElement: <Loading />,
        handle: { title: "My Group" },
      },
      {
        path: "/group-details/:id",
        loader: ({ params }) =>
          fetch(
            `https://papaya-hobby-server.vercel.app/groupsById/${params.id}`
          ),
        element: (
          <PrivetRoute>
            <GroupDetails />
          </PrivetRoute>
        ),
        hydrateFallbackElement: <Loading />,
        handle: { title: "Group Details Page" },
      },
      {
        path: "/update-group/:id",
        loader: ({ params }) =>
          fetch(
            `https://papaya-hobby-server.vercel.app/groupsById/${params.id}`
          ),
        element: (
          <PrivetRoute>
            <UpdateGroup />
          </PrivetRoute>
        ),
        hydrateFallbackElement: <Loading />,
        handle: { title: "Update Group" },
      },
      // user login/registration
      {
        path: "login",
        Component: Login,
        handle: { title: "Login" },
      },
      {
        path: "register",
        Component: Register,
        handle: { title: "Registration" },
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
