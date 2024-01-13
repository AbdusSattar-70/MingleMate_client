import React, { useState } from "react";
import { CommentType } from "../../utils/types";
import DummyAvatar from "../../images/avatar.jpg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import { calculateTimeElapsed } from "../../utils/formattedTime";
import { useAuth } from "../../hooks/useAuth";

interface RenderCommentProps {
  comment: CommentType;
  onDelete: (comment_id: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
}

const RenderComment: React.FC<RenderCommentProps> = ({
  comment,
  onDelete,
  onEdit,
}) => {
  const { auth } = useAuth();
  const {
    content,
    commenter_id,
    comment_id,
    commenter_name,
    commenter_avatar,
    created_at,
    updated_at,
  } = comment;
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const isAuthor = auth?.id === commenter_id;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(comment_id, editedContent);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedContent(content);
  };

  const handleDeleteClick = () => {
    onDelete(comment_id);
  };

  return (
    <>
      <ul className="flex h-auto w-full flex-col overflow-y-auto">
        <li>
          <div
            className={`${
              isEditing ? "flex-row" : "flex"
            } gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4`}
          >
            <div className="avatar">
              <div className="h-8 w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img src={commenter_avatar || DummyAvatar} alt="User" />
              </div>
            </div>
            <div>
              <Link
                to={`${ROUTES.USER_PROFILE}/${commenter_id}`}
                className="link link-success text-sm font-medium text-black dark:text-white"
              >
                {commenter_name}
              </Link>

              {isEditing ? (
                <div className="mt-2.5 flex h-auto w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <textarea
                    value={editedContent}
                    rows={3}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>
              ) : (
                <p className="text-sm">{comment.content}</p>
              )}

              <p className="text-xs">
                {calculateTimeElapsed(created_at, updated_at)}
              </p>

              {isAuthor && !isEditing && (
                <div className="flex gap-2">
                  <button
                    className="btn btn-xs"
                    type="button"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs"
                    type="button"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </div>
              )}

              {isAuthor && isEditing && (
                <div className="flex gap-2 text-sm">
                  <button
                    className="btn btn-xs"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-xs"
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default RenderComment;
