import { Link } from "react-router-dom";
import { LikeType } from "../utils/types";
import { ROUTES } from "../utils/constant";

interface likesProps {
  likes: LikeType[];
}

const RenderLikes: React.FC<likesProps> = ({ likes }) => {
  return (
    <>
      {likes.length > 0 ? (
        likes.map(({ id, user_id, user_photo }) => (
          <Link key={id} to={`${ROUTES.MY_PROFILE}/${user_id}`}>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="h-7 w-7">
                  <img src={user_photo} alt="user_photo" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="h-7 w-7 bg-neutral text-neutral-content">
                  <span>+{likes.length}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          <div className="avatar">
            <div className="h-7 w-7">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt=" dummyImg"
              />
            </div>
          </div>
          <div className="avatar placeholder">
            <div className="h-7 w-7 bg-neutral text-neutral-content">
              <span>+{likes.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenderLikes;
