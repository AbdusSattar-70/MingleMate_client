import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import { BASE_URL, ROUTES } from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import {
  CreateCollectionForm,
  CreateItem,
  Dashboard,
  EditProfile,
  GetSingleCollection,
  Home,
  Profile,
  SignIn,
  SignUp,
} from "./LazyComponents";
import MyCollections from "../pages/collection/MyCollections/MyCollections";
import MyItemsAll from "../pages/items/MyItems/MyItemsAll";
import GetSingleItem from "../pages/items/GetSingleItem";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      // collections related routes
      {
        path: ROUTES.MY_ALL_COLLECTIONS,
        element: <MyCollections />,
      },
      {
        path: `${ROUTES.DIESPLAY_SINGLE_COLLECTION}/:id`,
        element: <GetSingleCollection />,
        loader: ({ params }) => fetch(`${BASE_URL}/collections/${params.id}`),
      },
      {
        path: ROUTES.CREATE_COLLECTION,
        element: <CreateCollectionForm />,
      },
      // item related routes
      {
        path: `${ROUTES.CREATE_ITEM}/:id/create-item`,
        element: <CreateItem />,
      },
      {
        path: ROUTES.MY_ITEMS_ALL,
        element: <MyItemsAll />,
      },
      {
        path: `${ROUTES.GET_SIGNLE_ITEM}/:id`,
        element: <GetSingleItem />,
      },
      // authentication and authorization related routes
      {
        path: ROUTES.SIGNUP,
        element: <SignUp />,
      },
      {
        path: ROUTES.SIGNIN,
        element: <SignIn />,
      },
      {
        path: ROUTES.MY_PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES.PROFILE_EDIT,
        element: <EditProfile />,
      },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
