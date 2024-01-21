import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { API_ENDPOINT, BASE_URL, ROUTES } from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import {
  Home,
  SignUp,
  SignIn,
  Dashboard,
  UserProfile,
  EditProfile,
  CreateCollection,
  EditCollectionForm,
  CollectionDetails,
  CollectionsTable,
  UserAllColletions,
  CreateItem,
  EditItemForm,
  UserItemsTable,
  AllItemsTable,
  ItemDetailsNavigation,
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
        element: <UserProfile />,
        loader: async ({ params }) =>
          fetchData(`${BASE_URL}/${API_ENDPOINT.USER_PROFILE}/${params.id}`),
      },
      {
        path: ROUTES.PROFILE_EDIT,
        element: <EditProfile />,
      },

      // collections related routes
      {
        path: ROUTES.ALL_COLLECTIONS,
        element: <CollectionsTable />,
      },

      {
        path: `${ROUTES.USER_COLLECTIONS}/:userId`,
        element: <UserAllColletions />,
      },

      {
        path: `${ROUTES.DIESPLAY_SINGLE_COLLECTION}/:id`,
        element: <CollectionDetails />,
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
        element: <UserItemsTable />,
      },

      {
        path: ROUTES.GET_ITEMS_ALL,
        element: <AllItemsTable />,
      },

      {
        path: `${ROUTES.GET_SIGNLE_ITEM}/:id`,
        element: <ItemDetailsNavigation />,
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
