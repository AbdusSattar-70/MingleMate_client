import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import router from "./routes/router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <main className="mx-4 sm:mx-20 bg-slate-300">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </main>
);
