import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import GetLargestCollections from "./GetLargestCollections";
import HomeDecorator from "./HomeDecorator";
import keyId from "../../utils/keyId";
import DropdownTagsItem from "../items/itemDetails/Tags/DropdownTagsItem";
import useGetTags from "../../hooks/useGetTags";
import AllItemsHomePage from "./AllItemsHomePage";
import SmallSpinner from "../common/SmallSpinner";

const Home = () => {
  const { tags, loading } = useGetTags();

  return (
    <section className="w-full">
      <HomeDecorator />

      {/* Discover Amazing Collections */}
      <div className="mx-auto mb-8 w-full rounded border border-stroke p-7 text-meta-4 focus:border-primary dark:border-strokedark dark:bg-meta-4  dark:text-meta-9 dark:focus:border-primary">
        <div className="mx-auto flex max-w-[80rem] items-center justify-center gap-4">
          <h2 className="text-3xl font-semibold ">
            <span className="text-title-xl text-meta-7">E</span>xplore Our
            Unbelievable Collections and{" "}
            <span className="text-meta-5">Create</span> Your Own Awesome
            Collection!
          </h2>
        </div>
      </div>
      <GetLargestCollections />

      {/* Explore More Collections */}
      <div className="mx-auto mb-8 h-20 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
        <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
          <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
            <Link to={ROUTES.ALL_COLLECTIONS} className="btn btn-primary">
              Discover More Collections
            </Link>
          </div>
        </div>
      </div>

      {/* Find Your Treasures */}
      <div className="mx-auto mb-8 w-full rounded border border-stroke p-7 text-black focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-meta-9 dark:focus:border-primary">
        <div className="mx-auto max-w-[80rem]">
          <h2 className="text-3xl font-semibold">
            <span className="text-4xl text-meta-5">F</span>ind Your{" "}
            <span className="text-meta-7">Latest</span> Whiskey, Books, Coins,
            and More – Dive into a World of{" "}
            <span className="text-meta-7">Hidden</span> Wonders!
          </h2>
          <h5 className="text-lg font-semibold text-meta-5 dark:text-neutral-200">
            Like, Comment, and Share – Start the Adventure!
          </h5>
        </div>
      </div>

      {/* Check Out the Latest Items */}
      <div className="mb-8">
        <AllItemsHomePage />
      </div>

      {/* show all cloud tags */}
      <div className="mb-5.5 mt-4.5 h-auto">
        <h6 className="mb-4 p-1 text-3xl font-semibold">
          Quik search items with Tags:{loading && <SmallSpinner />}
        </h6>
        <div className="flex flex-wrap gap-4">
          {tags?.length > 0
            ? tags.map((tag: string) => (
                <ul key={keyId() + tag}>
                  <DropdownTagsItem tag={tag} />
                </ul>
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default Home;
