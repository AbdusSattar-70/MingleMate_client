import { TiExport } from "react-icons/ti";
import { Users } from "../../utils/types";
import CsvDownloader from "react-csv-downloader";

interface UsersCSVBtnProp {
  users: Users[];
}
const UsersCSVBtn: React.FC<UsersCSVBtnProp> = ({ users }) => {
  const headers = [
    "id",
    "user name",
    "email",
    "created at",
    "updated at",
    "blocked",
    "role",
    "bio",
    "items count",
    "collections count",
    "profession",
  ];
  const csvData = [
    headers,
    ...users.map((user) => [
      user.id,
      user.user_name,
      user.email,
      user.created_at,
      user.updated_at,
      user.blocked.toString(),
      user.role.toString(),
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
