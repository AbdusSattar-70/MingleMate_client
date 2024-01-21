import { useAuth } from "../../hooks/useAuth";
import { AVATAR, COLLECT_IMG } from "../../utils/constant";
import { detectPhoto } from "../../utils/detectPhoto";
import dummyAvatar from "../../images/avatar.jpg";
import coverImg from "../../images/cover/cover-01.webp";
import { FaCloudUploadAlt } from "react-icons/fa";
import SmallSpinner from "../common/SmallSpinner";
type PhotoUploadFormProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  usage: string;
  loading: boolean;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({
  setFile,
  usage,
  loading,
  handleDrop,
}) => {
  const { auth } = useAuth();

  return (
    <form>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-30 w-30 rounded-full">
          <div className="avatar">
            <div className="rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              {detectPhoto(usage) === AVATAR ? (
                <img src={auth?.avatar || dummyAvatar} alt="User Photo" />
              ) : detectPhoto(usage) === COLLECT_IMG ? (
                <img
                  src={auth?.collectImg || coverImg}
                  alt="Collection Photo"
                />
              ) : (
                <img src={auth?.ItemImg || coverImg} alt="item Photo" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        id="FileUpload"
        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target?.files && e.target?.files[0];

            if (selectedFile) {
              setFile(selectedFile);
            }
          }}
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          {loading ? (
            <SmallSpinner />
          ) : (
            <>
              {" "}
              <span className="flex h-25 w-25 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                <FaCloudUploadAlt className="text-6xl text-meta-5" />
              </span>
              <p>
                <span className="text-primary">Click to upload</span> or drag
                and drop
              </p>
              <p className="mt-1.5">JPEG, WEBP, PNG, JPG </p>
              <p>(max, 800 X 800px)</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default PhotoUploadForm;
