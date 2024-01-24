import { TiExport } from "react-icons/ti";
import { Users } from "../../utils/types";
import CsvDownloader from "react-csv-downloader";
import {
  defineUserRole,
  defineUserStatus,
} from "../../utils/userStatusAndRole";

interface UsersCSVBtnProp {
  users: Users[];
}
const UsersCSVBtn: React.FC<UsersCSVBtnProp> = ({ users }) => {
  const headers = [
    "User ID",
    "User Name",
    "Email",
    "Registered Time",
    "Last Updated",
    "Status",
    "Role",
    "Bio",
    "Total Items Own",
    "Total Collections Own",
    "Profession",
  ];
  const csvData = [
    headers,
    ...users.map((user) => [
      user.id,
      user.user_name,
      user.email,
      user.created_at,
      user.updated_at,
      defineUserStatus(user.blocked),
      defineUserRole(user.role),
      user.bio,
      user.items_count.toString(),
      user.collections_count.toString(),
      user.profession,
    ]),
  ];

  return (
    <CsvDownloader
      filename="users_data"
      separator=","
      wrapColumnChar={`"`}
      datas={csvData}
    >
      <button
        className="btn btn-primary btn-sm"
        type="button"
        aria-label="export Users"
      >
        <TiExport />
        CSV
      </button>
    </CsvDownloader>
  );
};

export default UsersCSVBtn;
