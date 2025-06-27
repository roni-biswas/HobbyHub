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
import DashboardLayout from "../layouts/DashBoardLayout";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import DesAllGroups from "../pages/Dashboard/DesAllGroups";

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
        loader: () => fetch(`${import.meta.env.VITE_base_url}/groups`),
        hydrateFallbackElement: <Loading />,
        handle: { title: "All Groups" },
      },
      {
        path: "group-details/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/groupsById/${params.id}`),
        Component: GroupDetails,
        hydrateFallbackElement: <Loading />,
        handle: { title: "Group Details Page" },
      },
      {
        path: "about-us",
        Component: AboutUs,
        handle: { title: "About Us" },
      },
      {
        path: "contact-us",
        Component: Contact,
        handle: { title: "Contact Us" },
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
  // dashboard routes
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardOverview,
        handle: { title: "Dashboard Home" },
      },
      // authentication/authorization route

      {
        path: "/dashboard/all-groups",
        Component: DesAllGroups,
        loader: () => fetch(`${import.meta.env.VITE_base_url}/groups`),
        hydrateFallbackElement: <Loading />,
        handle: { title: "All Groups" },
      },
      {
        path: "/dashboard/create-group",
        Component: CreateGroup,
        hydrateFallbackElement: <Loading />,
        handle: { title: "Create Group" },
      },
      {
        path: "/dashboard/my-group/:email",
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_base_url}/groupsByEmail/${params.email}`
          ),
        Component: MyGroups,
        hydrateFallbackElement: <Loading />,
        handle: { title: "My Group" },
      },
      {
        path: "/dashboard/group-details/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/groupsById/${params.id}`),
        Component: GroupDetails,
        hydrateFallbackElement: <Loading />,
        handle: { title: "Group Details Page" },
      },
      {
        path: "/dashboard/update-group/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_base_url}/groupsById/${params.id}`),
        Component: UpdateGroup,
        hydrateFallbackElement: <Loading />,
        handle: { title: "Update Group" },
      },
    ],
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
