import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constant";
import { FcViewDetails } from "react-icons/fc";
import { canManageAll } from "../../../utils/canManageAll";
import { GrUpdate } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAuth } from "../../../hooks/useAuth";
import { CollectionType } from "../../../utils/types";
import SmallSpinner from "../../common/SmallSpinner";
import { Tooltip } from "../../common/ToolTip";

interface TableProps {
  collections: CollectionType[];
  handleDeleteCollection: (id: string) => void;
  loading: boolean;
}

const Table: React.FC<TableProps> = ({
  collections,
  handleDeleteCollection,
  loading,
}) => {
  const { auth } = useAuth();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-meta-2 dark:text-meta-2 rtl:text-right">
        <thead className="border-b border-meta-9 bg-meta-5 text-xs uppercase text-white dark:text-white">
          <tr>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              ID
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Collection Name
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Collection Author
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Category
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Available Items
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Description
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Actions
            </th>
          </tr>
        </thead>
        {collections.length > 0 ? (
          <tbody>
            {collections.map(
              ({
                id,
                title,
                user_name,
                category,
                items_count,
                description,
                author_id,
              }) => (
                <tr
                  key={id}
                  className="border-b border-meta-9 bg-meta-4 hover:bg-body"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r border-meta-9 bg-form-input px-6 py-4 font-medium"
                  >
                    {id}
                  </th>
                  <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                    {title}
                  </td>
                  <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                    {user_name}
                  </td>
                  <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                    {category}
                  </td>
                  <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                    {items_count}
                  </td>
                  <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                    {description}
                  </td>
                  <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                    <div className="flex gap-2 text-sm">
                      <Tooltip html={<p>See Details</p>}>
                        <Link
                          to={`${ROUTES.DIESPLAY_SINGLE_COLLECTION}/${id}`}
                          className="btn btn-xs"
                        >
                          <FcViewDetails />
                        </Link>
                      </Tooltip>
                      {canManageAll(auth.id, auth.role, author_id) && (
                        <>
                          <Tooltip html={<p>Edit or Update</p>}>
                            <Link
                              to={`${ROUTES.EDIT_COLLECTION}/${id}`}
                              className="btn btn-xs"
                            >
                              <GrUpdate />
                            </Link>
                          </Tooltip>
                          <Tooltip html={<p>Destructive! Delete!</p>}>
                            <button
                              onClick={() => handleDeleteCollection(id)}
                              className="btn btn-xs"
                            >
                              {loading ? <SmallSpinner /> : <FaRegTrashCan />}
                            </button>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>Oops! No Collection Found</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
