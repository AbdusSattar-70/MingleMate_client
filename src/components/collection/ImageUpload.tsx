import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import useImageUpload from "../../firebase/useImageUpload";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const UploadImage: React.FC = () => {
  const { setAuth } = useAuth();
  const { uploadFile, uploadProgress, downloadURL, error } = useImageUpload();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (error) {
      toast.warn(error);
    } else if (downloadURL) {
      setAuth((prev) => {
        return {
          ...prev,
          collectImg: downloadURL,
        };
      });
      toast.success("Image uploaded successfully!");
    }
  }, [error, downloadURL, setAuth]);

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
    <>
      {uploadProgress && (
        <progress
          className="progress progress-success w-full"
          value={uploadProgress}
          max="100"
        ></progress>
      )}
      <div
        className="flex place-items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <label className="relative block cursor-pointer">
          <span className="sr-only">Add Image</span>
          <input
            name="imageupload"
            type="file"
            onChange={(e) => {
              const selectedFile = e.target?.files && e.target?.files[0];

              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
            className="absolute h-0 w-0 opacity-0"
          />
          <div className="flex flex-col items-center file:rounded-full file:px-4 file:py-2 file:text-sm file:text-violet-700 hover:file:bg-violet-100">
            <span className="text-slate-500">Drag and Drop</span>
            <span className="text-slate-500">Or</span>
            <FaFileImage className="text-4xl text-red-400" />
            <span className="text-slate-500">Select Image</span>
          </div>
        </label>
      </div>
    </>
  );
};

export default UploadImage;
