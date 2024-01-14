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
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setLoading(true); // Set loading to true when starting the upload

    const storage = getStorage(app);
    const types = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    if (!types.includes(file.type)) {
      setError("Only accept (png, jpeg, webp, jpg) images");
      setLoading(false); // Set loading to false when encountering an error
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
        setLoading(false); // Set loading to false when encountering an error
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
        setLoading(false); // Set loading to false when the upload is complete
      }
    );
  };

  return { uploadFile, uploadProgress, downloadURL, error, loading };
};

export default useImageUpload;
