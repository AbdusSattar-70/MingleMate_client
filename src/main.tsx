import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import router from "./routes/router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <main>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
  </main>
);
