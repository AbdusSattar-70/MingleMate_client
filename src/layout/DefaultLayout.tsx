import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import Sidebar from "../components/navbarSideBar/Sidebar";
import Header from "../components/navbarSideBar/Header";

const DefaultLayout = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  <Suspense fallback={<Spinner />}>
                    <Outlet />
                  </Suspense>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultLayout;
