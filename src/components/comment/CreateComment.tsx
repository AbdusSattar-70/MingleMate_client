/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { API_ENDPOINT, MESSAGES } from "../../utils/constant";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { MdOutlineSend } from "react-icons/md";
interface CreateCommentProps {
  item_id: string;
  updateComments: (updatedComment: CommentType) => void;
}
import { FcViewDetails } from "react-icons/fc";
import { CommentType } from "../../utils/types";

const CreateComment: React.FC<CreateCommentProps> = ({
  item_id,
  updateComments,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [comment, setComment] = useState<string>("");
  const data = {
    comment: {
      user_id: auth.id,
      item_id,
      content: comment,
    },
  };

  const CreateCommentHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.post(API_ENDPOINT.COMMENT, data);
      if (isSuccessRes(res)) {
        updateComments(res.data);
        toast.success(MESSAGES.SUCCESS);
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  return (
    <form onSubmit={(e) => CreateCommentHandler(e)}>
      <div className="mb-2">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="comment"
        ></label>
        <div className="relative">
          <span className="absolute left-4.5 top-4">
            <FcViewDetails />
          </span>
          <textarea
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            name="comment"
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here"
          ></textarea>
          <span className="absolute bottom-2 right-5">
            <MdOutlineSend className="text-3xl text-meta-5" />
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-xs" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
