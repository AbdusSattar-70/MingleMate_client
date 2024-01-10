import { ItemType } from "../../utils/types";
import dummyImg from "../../images/cards/cards-03.png";
import { ROUTES } from "../../utils/constant";
import { Link } from "react-router-dom";
import RenderLikes from "../../components/RenderLikes";
import CreateComment from "../../components/CreateComment";
import RenderComment from "../../components/RenderComment";

interface DisplaySingleItemProps {
  item: ItemType;
}

const DisplaySingleItem: React.FC<DisplaySingleItemProps> = ({ item }) => {
  const { id: item_id, comments, likes, tags } = item;

  return (
    <>
      <div className=" flex-1 bg-base-200 dark:bg-strokedark">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-8 p-8 lg:flex-row lg:gap-16 lg:p-16">
          <div className="h-[400px] w-full lg:w-1/2">
            <div className="h-full max-w-full">
              <img
                src={item?.image ? item.image : dummyImg}
                className="h-full w-full rounded-lg object-cover shadow-2xl"
                alt="item Image"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-xl font-bold sm:text-5xl lg:text-6xl">
              {item.item_name}
            </h1>
            <Link to={ROUTES.DIESPLAY_SINGLE_COLLECTION} className="py-6">
              {item.collection_name}
            </Link>
            <RenderLikes likes={likes} />
            <p>Comments: {item.comments.length}</p>
          </div>
        </div>
        {comments.length > 0
          ? comments.map((comment) => {
              return (
                <div key={comment.comment_id}>
                  <RenderComment comment={comment} />
                </div>
              );
            })
          : null}
        <CreateComment item_id={item_id} />

        {tags.length > 0
          ? tags.map((tag) => {
              return (
                <ul key={tag}>
                  <li>{tag}</li>
                </ul>
              );
            })
          : null}
      </div>
    </>
  );
};

export default DisplaySingleItem;
