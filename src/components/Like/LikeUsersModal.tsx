/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import keyId from "../../utils/keyId";
import avatar from "../../images/user/user-08.png";
import { LikeType } from "../../utils/types";
interface LikeUsersModalProps {
  likeRef: any;
  likesData: LikeType[];
}
const LikeUsersModal: React.FC<LikeUsersModalProps> = ({
  likeRef,
  likesData,
}) => {
  const navigate = useNavigate();

  const handleNavigateToUserProfile = (userId: string) => {
    navigate(`${ROUTES.USER_PROFILE}/${userId}`);
    likeRef.current.close();
  };

  return (
    <dialog ref={likeRef} className="modal">
      <div className="max-w-70">
        <div className="mt-2.5 flex max-h-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  sm:w-80">
          <div className="flex items-center justify-between gap-30 border-b px-4.5 py-3">
            <h5 className="border-b text-sm font-medium text-bodydark2">
              Liked Users List
            </h5>
            <p role="button" onClick={() => likeRef.current.close()}>
              X
            </p>
          </div>
          <ul className="flex flex-col overflow-y-auto">
            {likesData.length > 0 ? (
              likesData.map(({ id, user_id, user_photo, user_name }) => (
                <li key={keyId() + id}>
                  <div
                    role="button"
                    className="link link-success flex cursor-pointer flex-col gap-1 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    onClick={() => handleNavigateToUserProfile(user_id)}
                  >
                    <div className=" flex items-center justify-center text-sm text-black dark:text-white">
                      <div className="avatar">
                        <div className=" rounded-full">
                          <img src={user_photo || avatar} alt="profile" />
                        </div>
                      </div>
                      <span className="font-semibold">{user_name}</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No User Found</p>
            )}
          </ul>
        </div>
      </div>
    </dialog>
  );
};

export default LikeUsersModal;
