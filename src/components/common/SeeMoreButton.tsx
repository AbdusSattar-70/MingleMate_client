import SmallSpinner from "./SmallSpinner";

interface SeeMoreButtonProps {
  isMoreData: boolean;
  handleSeeMore: () => void;
  loading: boolean;
}
const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({
  isMoreData,
  handleSeeMore,
  loading,
}) => {
  return (
    <div className="mx-auto mb-8 h-20 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
      <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
        <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
          {isMoreData ? (
            <button onClick={handleSeeMore} className="btn btn-primary">
              {loading ? <SmallSpinner /> : "Discover More"}
            </button>
          ) : (
            <p className="btn btn-warning">No More Data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeMoreButton;
