import { Link } from "react-router-dom";
import UserTable from "./UserTable";

const Dashboard = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-3 p-4 sm:p-8 md:p-10">
      <UserTable />
      <Link className="btn btn-secondary" to="/">
        Go to Home
      </Link>
    </section>
  );
};

export default Dashboard;
