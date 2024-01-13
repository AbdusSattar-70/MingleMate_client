import { CommentType, ItemType } from "../../utils/types";
import dummyImg from "../../images/cards/cards-03.png";
import { ROUTES } from "../../utils/constant";
import { Link } from "react-router-dom";
import RenderLikes from "./RenderLikes";
import CreateComment from "../comment/CreateComment";
import RenderComment from "../comment/RenderComment";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import Heart from "react-animated-heart";
import DropdownTagsItem from "../Tags/DropdownTagsItem";
import RenderItemCustomFields from "./RenderItemCustomFields";
const DisplaySingleItem = ({ itemData }: { itemData: ItemType }) => {
  const {
    item_id,
    comments: commentsData,
    item_custom_fields,
    likes,
    collection_name,
    item_name,
    image,
    item_author,
    tags,
  } = itemData;
  const [isClick, setClick] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [comments, setComments] = useState(commentsData);

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

  return (
    <>
      <div className=" flex-1 bg-base-200 dark:bg-strokedark">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-8 p-8 lg:flex-row lg:gap-16 lg:p-16">
          <div className="h-[400px] w-full lg:w-1/2">
            <div className="h-full max-w-full">
              <img
                src={image ? image : dummyImg}
                className="h-full w-full rounded-lg object-cover shadow-2xl"
                alt="item Image"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-xl font-bold sm:text-5xl lg:text-6xl">
              {item_name}
            </h1>
            <h2 className="text-xl font-bold sm:text-5xl lg:text-6xl">
              {item_author}
            </h2>
            <Link to={ROUTES.DIESPLAY_SINGLE_COLLECTION} className="py-6">
              {collection_name}
            </Link>
            <RenderLikes likes={likes} />

            <p>Comments: {commentsData?.length}</p>
          </div>
        </div>
        <div className="mx-auto mb-5.5 mt-4.5 max-w-3xl overflow-y-auto rounded-md border border-stroke py-2.5 shadow-lg drop-shadow-1 dark:border-strokedark dark:bg-[#37404F] dark:drop-shadow-none">
          <RenderItemCustomFields item_custom_fields={item_custom_fields} />
        </div>

        <div className=" mx-auto mb-5.5 mt-4.5 flex max-h-15 max-w-94 justify-between rounded-md border border-stroke py-2.5 shadow-lg drop-shadow-1 dark:border-strokedark dark:bg-[#37404F] dark:drop-shadow-none">
          <div
            role="button"
            onClick={() => setDropdownOpen(true)}
            className="flex h-6 items-center justify-center gap-1 border-r border-stroke px-4 font-semibold text-black hover:text-meta-5 dark:border-strokedark dark:text-white dark:hover:text-neutral-400"
          >
            <p>Comment</p>
            <FaRegCommentDots />
          </div>
          <div
            role="button"
            className="flex h-6 items-center justify-center gap-1 border-r border-stroke px-4 font-semibold text-black hover:text-meta-5 dark:border-strokedark dark:text-white dark:hover:text-neutral-400"
          >
            <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
          </div>
        </div>

        {dropdownOpen && (
          <div className="mt-2.5 flex h-auto w-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4.5 py-3">
              <CreateComment
                item_id={item_id}
                updateComments={updateComments}
              />
            </div>
            {comments?.length > 0
              ? comments.map((comment) => {
                  return (
                    <div key={comment.comment_id}>
                      <RenderComment
                        comment={comment}
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        )}

        <div className="mx-auto mb-5.5 mt-4.5 h-auto max-w-3xl p-4 pb-20">
          <h6 className="mb-4 p-1 text-3xl font-semibold">Related Tags:</h6>
          <div className="flex flex-wrap gap-4">
            {tags?.length > 0
              ? tags.map((tag) => (
                  <ul key={tag} className="">
                    <DropdownTagsItem tag={tag} />
                  </ul>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplaySingleItem;
