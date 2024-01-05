import { Link, useLoaderData } from "react-router-dom";
import { CollectionType } from "../../utils/types";
const dummyImg =
  "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp";
const Collection = () => {
  const collection: CollectionType = useLoaderData() as CollectionType;

  console.log(collection);
  return (
    <div className="">
      <div className=" flex-1 bg-base-200">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-8 p-8 lg:flex-row lg:gap-16 lg:p-16">
          <div className="h-[400px] w-full lg:w-1/2">
            <div className="h-full max-w-full">
              <img
                src={collection.image ? collection.image : dummyImg}
                className="h-full w-full rounded-lg object-cover shadow-2xl"
                alt="Collection Image"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-xl font-bold sm:text-5xl lg:text-6xl">
              {collection.title}
            </h1>
            <p className="py-6">
              {collection.description}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus molestiae recusandae dignissimos, officiis, quibusdam
              nulla eligendi tempore pariatur autem harum totam corporis aliquam
              aut doloribus aliquid soluta eum beatae dolor.
            </p>
            <p>Items: {collection.items_count}</p>
            <Link to={`/add-item/${collection.id}`} className="btn btn-primary">
              Add Item
            </Link>
          </div>
        </div>
      </div>

      <section className=" space-y-4 font-sans antialiased">
        <div className="relative max-h-screen overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-blue-100 rtl:text-right dark:text-blue-100">
            <thead className="border-b border-blue-400 bg-blue-600 text-xs uppercase text-white dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Registration Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Login Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>{/*  */}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Collection;
