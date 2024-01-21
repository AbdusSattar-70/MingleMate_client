import { lazy } from "react";

export const Home = lazy(() => import("../components/home/Home"));
export const Dashboard = lazy(
  () => import("../components/Dashboard/Dashboard")
);
export const SignIn = lazy(() => import("../components/AuthControll/SignIn"));
export const SignUp = lazy(() => import("../components/AuthControll/SignUp"));
export const EditProfile = lazy(
  () => import("../components/MyCorner/EditProfile")
);
export const UserProfile = lazy(
  () => import("../components/MyCorner/UserProfile")
);

// collection
export const CreateCollection = lazy(
  () => import("../components/collection/CreateCollection")
);
export const EditCollectionForm = lazy(
  () => import("../components/collection/EditCollectionForm")
);
export const CollectionDetails = lazy(
  () => import("../components/collection/CollectionDetails")
);
export const UserAllColletions = lazy(
  () => import("../components/MyCorner/UserAllCollections")
);
export const CollectionsTable = lazy(
  () => import("../components/home/collectionsTable/CollectionsTable")
);

// items
export const CreateItem = lazy(
  () => import("../components/items/createItem/CreateItem")
);
export const EditItemForm = lazy(
  () => import("../components/items/EditItemForm")
);
export const ItemDetailsNavigation = lazy(
  () => import("../components/items/itemDetails/ItemDetailsNavigation")
);
export const UserItemsTable = lazy(
  () => import("../components/MyCorner/UserItemsTable")
);
export const AllItemsTable = lazy(
  () => import("../components/items/AllItemsTable")
);
