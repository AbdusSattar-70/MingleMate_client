import UserTable from "./UserTable.tsx";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4  md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <UserTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
