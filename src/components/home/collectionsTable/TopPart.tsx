import React from "react";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constant";
import { useAuth } from "../../../hooks/useAuth";

interface TopPartProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}

const TopPart: React.FC<TopPartProps> = ({ setSearchTerm, searchTerm }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!auth.authToken) {
      navigate(ROUTES.SIGNIN, { state: { from: location.pathname } });
      return;
    } else {
      navigate(ROUTES.CREATE_COLLECTION);
    }
  };

  return (
    <div className="mx-auto mb-4 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
      <div className="space-y-1 p-8 text-lg font-semibold dark:text-neutral-200">
        <h1 className="text-3xl">
          Explore and discover fantastic collections with ease!
        </h1>
        <p className="text-sm text-meta-4 dark:text-whiter">
          These incredible collections are ready for your creative touch. Search
          by user, collection name, description, item name, or category to find
          the perfect inspiration!
        </p>
        <div className="flex flex-col justify-start gap-4 sm:flex-row">
          <button onClick={handleNavigate} className="btn btn-primary">
            Create a New Collection
          </button>
          <div className="form-control">
            <label className="label sr-only">
              <span className="label-text">search</span>
            </label>
            <input
              type="search"
              placeholder="search by user collection or category name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered dark:bg-form-input"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPart;
