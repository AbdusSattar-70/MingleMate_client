import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import { API_ENDPOINT, BASE_URL, ROUTES } from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import {
  CreateCollectionForm,
  CreateItem,
  Dashboard,
  EditProfile,
  GetSingleCollection,
  Home,
  SignIn,
  SignUp,
} from "./LazyComponents";
import MyCollections from "../pages/MyCorner/MyCollections";
import GetSingleItemDataFromRoute from "../pages/RouteFetch/GetSingleItemDataFromRoute";
import GetUserItemsAllFromRoute from "../pages/RouteFetch/GetUserItemsAllFromRoute";
import MyProfile from "../pages/MyCorner/MyProfile";
import UserProfileFromRoute from "../pages/RouteFetch/UserProfileFromRoute";
import MyItemsAll from "../pages/MyCorner/MyItemsAll";

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
      {
        path: `${ROUTES.USER_PROFILE}/:id`,
        element: <UserProfileFromRoute />,
        loader: ({ params }) =>
          fetch(`${BASE_URL}/${API_ENDPOINT.USER_PROFILE}/${params.id}`),
      },
      // collections related routes
      {
        path: ROUTES.MY_ALL_COLLECTIONS,
        element: <MyCollections />,
      },
      {
        path: `${ROUTES.DIESPLAY_SINGLE_COLLECTION}/:id`,
        element: <GetSingleCollection />,
        loader: ({ params }) =>
          fetch(`${BASE_URL}/${API_ENDPOINT.COLLECTION}/${params.id}`),
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
        path: `${ROUTES.USER_ITEMS}/:user_id`,
        element: <GetUserItemsAllFromRoute />,
        loader: ({ params }) =>
          fetch(`${BASE_URL}/${API_ENDPOINT.USER_ITEMS}/${params.user_id}`),
      },
      {
        path: ROUTES.MY_ITEMS_ALL,
        element: <MyItemsAll />,
      },
      {
        path: `/item/:id`,
        element: <GetSingleItemDataFromRoute />,
        loader: ({ params }) =>
          fetch(`${BASE_URL}/${API_ENDPOINT.ITEM}/${params.id}`),
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
        element: <MyProfile />,
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
