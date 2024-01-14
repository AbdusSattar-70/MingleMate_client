import { LikeType } from "../../utils/types";
import { API_ENDPOINT } from "../../utils/constant";
import avatar from "../../images/user/user-06.png";
import keyId from "../../utils/keyId";
import { useRef, useState } from "react";
import axios from "../../utils/api";
import isSuccessRes from "../../utils/apiResponse";
import LikeUsersModal from "./LikeUsersModal";

interface likesProps {
  likes: LikeType[];
  item_id: string;
}

const RenderLikes: React.FC<likesProps> = ({ likes, item_id }) => {
  const likeRef = useRef<HTMLDialogElement | null>(null);
  const [likesData, setLikesData] = useState<LikeType[]>(likes);
  const [loading, setLoading] = useState(false);

  const handleFetchLikedUsers = async () => {
    setLoading(true);
    const res = await axios.get(`${API_ENDPOINT.ITEM_LIKES_COUNT}/${item_id}`);
    if (isSuccessRes(res) && likeRef.current) {
      setLikesData(res.data);
      setLoading(false);
      likeRef.current.showModal();
    }
  };

  return (
    <>
      <div key={keyId()} role="button" onClick={handleFetchLikedUsers}>
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          {loading ? (
            "loading..."
          ) : (
            <>
              <div className="avatar">
                <div className="h-7 w-7">
                  <img src={avatar} alt="user_photo" />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="h-7 w-7 bg-neutral text-neutral-content">
                  <span>+{likes.length > 0 ? likes.length : 0}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <LikeUsersModal likesData={likesData} likeRef={likeRef} />
    </>
  );
};

export default RenderLikes;
