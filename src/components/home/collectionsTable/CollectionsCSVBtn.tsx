import React from "react";
import CsvDownloader from "react-csv-downloader";
import { CollectionType } from "../../../utils/types";
import { TiExport } from "react-icons/ti";

interface CollectionsCSVBtnProps {
  collections: CollectionType[];
}

const CollectionsCSVBtn: React.FC<CollectionsCSVBtnProps> = ({
  collections,
}) => {
  const headers = [
    "ID",
    "Collection Name",
    "Collection Author",
    "Category",
    "Available Items",
    "Description",
  ];

  const csvData = [
    headers,
    ...collections.map((collection) => [
      collection.id,
      collection.title,
      collection.user_name,
      collection.category,
      collection.items_count.toString(),
      collection.description,
    ]),
  ];

  return (
    <CsvDownloader
      filename="collections_data"
      separator=","
      wrapColumnChar={`"`}
      datas={csvData}
    >
      <button
        className="btn btn-primary btn-sm"
        type="button"
        aria-label="export Collections"
      >
        <TiExport />
        CSV
      </button>
    </CsvDownloader>
  );
};

export default CollectionsCSVBtn;
