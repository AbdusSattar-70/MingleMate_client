import { lazy } from "react";

export const Home = lazy(() => import("../components/home/Home"));
export const Dashboard = lazy(
  () => import("../components/Dashboard/Dashboard")
);
export const GetAllItems = lazy(
  () => import("../components/items/GetAllItems")
);
export const CollectionWithItemTable = lazy(
  () => import("../components/RouteFetch/CollectionWithItemTable")
);
export const CreateCollection = lazy(
  () => import("../components/collection/CreateCollection")
);
export const CreateItem = lazy(() => import("../components/items/CreateItem"));
export const SignIn = lazy(() => import("../components/AuthControll/SignIn"));
export const SignUp = lazy(() => import("../components/AuthControll/SignUp"));
export const MyProfile = lazy(() => import("../components/MyCorner/MyProfile"));
export const EditProfile = lazy(
  () => import("../components/MyCorner/EditProfile")
);
