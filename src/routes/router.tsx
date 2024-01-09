import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import { BASE_URL, ROUTES } from "../utils/constant";
import DefaultLayout from "../layout/DefaultLayout";
import {
  CreateCollectionForm,
  CreateItem,
  Dashboard,
  DisplayItemsAll,
  EditProfile,
  GetSingleCollection,
  Home,
  Profile,
  SignIn,
  SignUp,
} from "./LazyComponents";

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
        path: ROUTES.ADMIN_DASHBOARD,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.DISPLAY_ALL_ITEMS,
        element: <DisplayItemsAll />,
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
      {
        path: `${ROUTES.CREATE_ITEM}/:id/create-item`,
        element: <CreateItem />,
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
        path: ROUTES.SIGNUP,
        element: <SignUp />,
      },
      {
        path: ROUTES.PROFILE_EDIT,
        element: <EditProfile />,
      },
    ],
  },
]);

export default router;
