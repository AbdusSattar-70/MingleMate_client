import { CommentType, ItemType } from "../../../utils/types";
import { API_ENDPOINT, ROUTES } from "../../../utils/constant";
import RenderLikes from "./Like/RenderLikes";
import CreateComment from "./comment/CreateComment";
import RenderComment from "./comment/RenderComment";
import { useState } from "react";
import Heart from "react-animated-heart";
import keyId from "../../../utils/keyId";
import DropdownTagsItem from "./Tags/DropdownTagsItem";
import isSuccessRes, { setErrorToast } from "../../../utils/apiResponse";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAuth } from "../../../hooks/useAuth";
import ItemDetailsTop from "./ItemDetailsTop";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "../../common/SmallSpinner";
interface ItemDetailsProps {
  itemData: ItemType;
}
const ItemDetails: React.FC<ItemDetailsProps> = ({ itemData }) => {
  const {
    item_id,
    comments: commentsData,
    item_custom_fields,
    likes: likesData,
    collection_name,
    collection_id,
    item_name,
    image,
    item_author,
    tags,
  } = itemData;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comments, setComments] = useState(commentsData);
  const [likes, setLikes] = useState(likesData);
  const [loading, setLoading] = useState(false);
  const [isClick, setClick] = useState(false);
  const [like, setLike] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments?.filter(
      (comment) => comment.comment_id !== commentId
    );
    setComments(updatedComments);
  };

  const handleEditComment = (commentId: string, newContent: string) => {
    const updatedComments = comments?.map((comment) =>
      comment.comment_id === commentId
        ? { ...comment, content: newContent }
        : comment
    );
    setComments(updatedComments);
  };

  const updateComments = (newComment: CommentType) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const postLikeHandlar = async () => {
    try {
      if (!auth.authToken) {
        navigate(ROUTES.SIGNIN, { state: { from: location.pathname } });
        return;
      }
      setLoading(true);
      const res = await axiosPrivate.post(API_ENDPOINT.LIKE, {
        like: {
          user_id: auth.id,
          item_id,
        },
      });

      if (isSuccessRes(res)) {
        setLoading(false);
        setClick(!isClick);
        setLikes((prev) => [...prev, res.data]);
        setLike(true);
      }
    } catch (error) {
      setErrorToast(error);
      setLoading(false);
      setLike(false);
    }
  };

  return (
    <>
      <div className="hero flex max-w-[80rem] items-center justify-center gap-4 pb-8">
        <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
          <ItemDetailsTop
            item_custom_fields={item_custom_fields}
            collection_name={collection_name}
            collection_id={collection_id}
            item_name={item_name}
            image={image}
            item_author={item_author}
          />
          <div className="card-body">
            {/* like comment action start*/}
            <div className="flex h-20  items-center justify-between gap-1 rounded-md border border-stroke p-2 py-3.5 shadow-lg drop-shadow-1 dark:border-strokedark dark:bg-[#37404F] dark:drop-shadow-none">
              <p className="flex items-center gap-1">
                <span>
                  <FaRegCommentDots className="text-2xl" />
                </span>
                <span>{comments.length}</span>
              </p>
              <div className="relative flex justify-end">
                <div className="absolute -top-8 right-5">
                  <Heart isClick={isClick} onClick={() => postLikeHandlar()} />
                </div>
                <RenderLikes likes={likes} item_id={item_id} />
              </div>
            </div>

            <div className="flex h-15 items-center justify-between rounded-md border border-stroke py-3.5 shadow-lg drop-shadow-1 dark:border-strokedark dark:bg-[#37404F] dark:drop-shadow-none">
              <div
                role="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center gap-1 px-4 font-semibold text-black hover:text-meta-5  dark:text-white dark:hover:text-neutral-400"
              >
                <p>Comment</p>
              </div>

              <div className="flex items-center justify-end gap-1 px-4 font-semibold text-black  dark:text-white">
                <span>
                  {loading ? (
                    <SmallSpinner />
                  ) : (
                    <div
                      onClick={postLikeHandlar}
                      role="button"
                      className=" hover:text-meta-5  dark:text-white dark:hover:text-neutral-400"
                    >
                      {like ? (
                        <p className=" text-meta-5">Liked</p>
                      ) : (
                        <p>Like</p>
                      )}
                    </div>
                  )}
                </span>
              </div>
            </div>

            {dropdownOpen && (
              <div className="mt-2.5 flex h-auto w-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {comments?.length > 0
                  ? comments.map((comment) => {
                      return (
                        <RenderComment
                          key={comment.comment_id}
                          comment={comment}
                          onDelete={handleDeleteComment}
                          onEdit={handleEditComment}
                        />
                      );
                    })
                  : null}
                <div className="px-4.5 py-3">
                  <CreateComment
                    item_id={item_id}
                    updateComments={updateComments}
                  />
                </div>
              </div>
            )}
            {/* like comment action end*/}

            <div className="mb-5.5 mt-4.5 h-auto">
              <h6 className="mb-4 p-1 text-3xl font-semibold">Related Tags:</h6>
              <div className="flex flex-wrap gap-4">
                {tags?.length > 0
                  ? tags.map((tag) => (
                      <ul key={keyId() + tag} className="">
                        <DropdownTagsItem tag={tag} />
                      </ul>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
