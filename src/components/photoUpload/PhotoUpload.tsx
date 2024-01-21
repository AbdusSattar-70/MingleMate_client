import { useEffect, useState } from "react";
import useImageUpload from "../../firebase/useImageUpload";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { detectPhoto } from "../../utils/detectPhoto";
import { COLLECT_IMG, ITEM_IMG } from "../../utils/constant";
import ProgressBar from "./ProgressBar";
import PhotoUploadForm from "./PhotoUploadForm";

const PhotoUpload = ({ usage }: { usage: string }) => {
  const { setAuth } = useAuth();
  const { uploadFile, downloadURL, error, uploadProgress, loading } =
    useImageUpload();
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (error) {
      toast.warn(error);
    } else if (downloadURL) {
      if (detectPhoto(usage) === COLLECT_IMG) {
        setAuth((prev) => {
          return {
            ...prev,
            collectImg: downloadURL,
          };
        });
      } else if (detectPhoto(usage) === ITEM_IMG) {
        setAuth((prev) => {
          return {
            ...prev,
            ItemImg: downloadURL,
          };
        });
      } else {
        setAuth((prev) => {
          return {
            ...prev,
            avatar: downloadURL,
          };
        });
      }
      toast.success("Image uploaded successfully!");
    }
  }, [error, downloadURL, setAuth, usage]);

  useEffect(() => {
    const UploadImagedynamically = async () => {
      if (file) {
        await uploadFile(file);
        setFile(null);
      }
    };

    if (file !== null) {
      UploadImagedynamically();
    }
  }, [file, uploadFile]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const image = e.dataTransfer.files[0];

    if (image) {
      setFile(image);
    } else {
      toast.warn("Please select an image to upload.");
    }
  };
  return (
    <div className="col-span-5 xl:col-span-2 ">
      <ProgressBar uploadProgress={uploadProgress} />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Upload Image
          </h3>
        </div>
        <div className="p-7">
          <PhotoUploadForm
            loading={loading}
            handleDrop={handleDrop}
            setFile={setFile}
            usage={usage}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
