import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import Sidebar from "../components/navbarSideBar/Sidebar";
import Header from "../components/navbarSideBar/Header";
import Footer from "../components/common/Footer";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Suspense fallback={<Spinner />}>
                  <Outlet />
                </Suspense>
                {/* Stay Connected */}
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
