import { FaRegTrashAlt } from "react-icons/fa";
import { CommentType } from "../utils/types";
import { FcViewDetails } from "react-icons/fc";
import dummyImg from "../images/user/user-07.png";
import DropdownMessage from "./DropdownMessage";
interface RenderCommentProps {
  comment: CommentType;
}
const RenderComment: React.FC<RenderCommentProps> = ({ comment }) => {
  console.log(comment);
  return (
    <>
      <ul className="space-y-2">
        <div
          key={comment.comment_id}
          className="flex flex-col gap-2 overflow-auto bg-body p-2 md:flex-row md:justify-between"
        >
          <img
            src={comment.commenter_avatar || dummyImg}
            alt="commenter_avatar"
          />
          <p>{comment.commenter_name}</p>
          <p>{comment.content}</p>
          <p>{comment.created_at}</p>
          <p>{comment.updated_at}</p>
          <button
            // onClick={() => handleDeleteField(id)}
            className="btn btn-error"
            type="button"
            aria-label="Delete comment"
          >
            <FaRegTrashAlt />
            <p className="sr-only">Delete</p>
          </button>
          <button
            // onClick={() => handleEditComment(id)}
            className="btn btn-error"
            type="button"
            aria-label="Edit comment"
          >
            <FcViewDetails />
            <p className="sr-only">Edit</p>
          </button>
        </div>
      </ul>
      <DropdownMessage />
    </>
  );
};

export default RenderComment;
