import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../components/errorPage/ErrorPage";
import Home from "../components/home/home/Home";
import SignIn from "../components/AuthControll/SignIn";
import SignUp from "../components/AuthControll/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Collections from "../components/collection/Collections";
import Profile from "../components/profile/Profile";
import CreateCollectionForm from "../components/collection/CreateCollection";
import Collection from "../components/collection/Collection";
import CreateItem from "../items/CreateItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/collection/:id",
        element: <Collection />,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/collections/${params.id}`),
      },
      {
        path: "/add-collection",
        element: <CreateCollectionForm />,
      },
      {
        path: "/add-item/:id",
        element: <CreateItem />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
