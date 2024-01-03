import { useEffect, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import useImageUpload from "../../firebase/useImageUpload";
import { toast } from "react-toastify";

const UploadImage: React.FC = () => {
  const { uploadFile, downloadURL, error } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (error) {
      toast.warn(error);
    } else if (downloadURL) {
      toast.success("Image uploaded successfully!");
    }
  }, [error, downloadURL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    if (file) {
      uploadFile(file);
    } else {
      toast.warn("Please select an image to upload.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const image = e.dataTransfer.files[0];
    setFile(image || null);
    if (file) {
      uploadFile(file);
    } else {
      toast.warn("Please select an image to upload.");
    }
  };

  return (
    <>
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
            onChange={handleChange}
            ref={inputRef}
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
