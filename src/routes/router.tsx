import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { API_ENDPOINT, BASE_URL, ROUTES } from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import {
  CreateCollection,
  CreateItem,
  Dashboard,
  EditProfile,
  CollectionWithItemTable,
  Home,
  SignIn,
  SignUp,
  GetAllItems,
  MyProfile,
} from "./LazyComponents";
import ErrorPage from "../components/errorPage/ErrorPage";
import UserProfileFromRoute from "../components/RouteFetch/UserProfileFromRoute";
import MyCollections from "../components/MyCorner/MyCollections";
import GetAllCollections from "../components/home/GetAllCollections";
import UserColletionsFromRoute from "../components/RouteFetch/UserColletionsFromRoute";
import GetUserItemsAllFromRoute from "../components/RouteFetch/GetUserItemsAllFromRoute";
import MyItemsAll from "../components/MyCorner/MyItemsAll";
import GetSingleItemDataFromRoute from "../components/RouteFetch/GetSingleItemDataFromRoute";

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
        path: ROUTES.ALL_COLLECTIONS,
        element: <GetAllCollections />,
      },

      {
        path: `${ROUTES.USER_COLLECTIONS}/:userId`,
        element: <UserColletionsFromRoute />,
      },

      {
        path: `${ROUTES.DIESPLAY_SINGLE_COLLECTION}/:id`,
        element: <CollectionWithItemTable />,
        loader: ({ params }) =>
          fetch(`${BASE_URL}/${API_ENDPOINT.COLLECTION}/${params.id}`),
      },
      {
        path: ROUTES.CREATE_COLLECTION,
        element: <CreateCollection />,
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
        path: ROUTES.GET_ITEMS_ALL,
        element: <GetAllItems />,
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
