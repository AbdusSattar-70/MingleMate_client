import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "./firebase";

const useImageUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    const storage = getStorage(app);
    const types = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    if (!types.includes(file.type)) {
      setError("Only accept (png, jpeg, webp, jpg) images");
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(percentage);
      },
      (error) => {
        setError(`Error uploading file: ${error.message}`);
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
      }
    );
  };

  return { uploadFile, uploadProgress, downloadURL, error };
};

export default useImageUpload;
