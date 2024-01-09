import { lazy } from "react";

export const Home = lazy(() => import("../pages/home/Home"));
export const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
export const DisplayItemsAll = lazy(
  () => import("../pages/items/DisplayItemsAll")
);
export const GetSingleCollection = lazy(
  () => import("../pages/collection/GetSingleCollection")
);
export const CreateCollectionForm = lazy(
  () => import("../pages/collection/CreateCollection")
);
export const CreateItem = lazy(() => import("../pages/items/CreateItem"));
export const SignIn = lazy(() => import("../pages/AuthControll/SignIn"));
export const SignUp = lazy(() => import("../pages/AuthControll/SignUp"));
export const Profile = lazy(() => import("../pages/AuthControll/Profile"));
export const EditProfile = lazy(
  () => import("../pages/AuthControll/EditProfile")
);
