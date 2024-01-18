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
  UserProfileFromRoute,
  MyCollections,
  CollectionsTable,
  UserColletionsFromRoute,
  EditCollectionForm,
  EditItemForm,
  GetUserItemsAllFromRoute,
  MyItemsAll,
  GetSingleItemDataFromRoute,
} from "./LazyComponents";
import ErrorPage from "../components/errorPage/ErrorPage";
import { fetchData } from "./fetchDataRouter";

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
        loader: async ({ params }) =>
          fetchData(`${BASE_URL}/${API_ENDPOINT.USER_PROFILE}/${params.id}`),
      },
      // collections related routes
      {
        path: ROUTES.MY_ALL_COLLECTIONS,
        element: <MyCollections />,
      },
      {
        path: ROUTES.ALL_COLLECTIONS,
        element: <CollectionsTable />,
      },

      {
        path: `${ROUTES.USER_COLLECTIONS}/:userId`,
        element: <UserColletionsFromRoute />,
      },

      {
        path: `${ROUTES.DIESPLAY_SINGLE_COLLECTION}/:id`,
        element: <CollectionWithItemTable />,
        loader: async ({ params }) =>
          fetchData(`${BASE_URL}/${API_ENDPOINT.COLLECTION}/${params.id}`),
      },
      {
        path: ROUTES.CREATE_COLLECTION,
        element: <CreateCollection />,
      },

      {
        path: `${ROUTES.EDIT_COLLECTION}/:collection_id`,
        element: <EditCollectionForm />,
        loader: async ({ params }) =>
          fetchData(
            `${BASE_URL}/${API_ENDPOINT.COLLECTION}/${params.collection_id}`
          ),
      },

      {
        path: `${ROUTES.CREATE_ITEM}/:collection_id/create-item`,
        element: <CreateItem />,
        loader: async ({ params }) =>
          fetchData(
            `${BASE_URL}/${API_ENDPOINT.COLLECTION_CUSTOM_FIELDS}/${params.collection_id}`
          ),
      },

      {
        path: `${ROUTES.EDIT_ITEM}/:id/edit-item`,
        element: <EditItemForm />,
        loader: async ({ params }) =>
          fetchData(`${BASE_URL}/${API_ENDPOINT.ITEM}/${params.id}`),
      },
      {
        path: `${ROUTES.USER_ITEMS}/:user_id`,
        element: <GetUserItemsAllFromRoute />,
        loader: async ({ params }) =>
          fetchData(`${BASE_URL}/${API_ENDPOINT.USER_ITEMS}/${params.user_id}`),
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
        loader: async ({ params }) =>
          fetchData(`${BASE_URL}/${API_ENDPOINT.ITEM}/${params.id}`),
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
