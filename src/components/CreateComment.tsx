import { FcViewDetails } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import isSuccessRes, { setErrorToast } from "../utils/apiResponse";
import { API_ENDPOINT, MESSAGES } from "../utils/constant";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface CreateCommentProps {
  item_id: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({ item_id }) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
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
        toast.success(MESSAGES.SUCCESS);
        setAuth((prev) => {
          return {
            ...prev,
            comment: res.data,
          };
        });
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-7">
              <form onSubmit={(e) => CreateCommentHandler(e)}>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="comment"
                  >
                    Write Comment
                  </label>
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
                  </div>
                </div>
                <div className="flex justify-end gap-4.5">
                  <button className="btn btn-primary" type="submit">
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;

// <ul className="space-y-2" id="dynamicUl">
//   {comments.map(({ id, content, user_name }) => (
//     <div
//       key={id}
//       className="bg-slate-200 flex flex-col gap-2 overflow-auto p-2 md:flex-row md:justify-between"
//     >
//       <p>{user_name}</p>
//       <p>{content}</p>
//       <button
//         // onClick={() => handleDeleteField(id)}
//         className="btn btn-error"
//         type="button"
//         aria-label="Delete comment"
//       >
//         <FaRegTrashAlt />
//         <p className="sr-only">Delete</p>
//       </button>
//       <button
//         onClick={() => handleEditComment(id)}
//         className="btn btn-error"
//         type="button"
//         aria-label="Edit comment"
//       >
//         <FcViewDetails />
//         <p className="sr-only">Edit</p>
//       </button>
//     </div>
//   ))}
// </ul>;
