type ProgressBarProps = {
  uploadProgress: number;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ uploadProgress }) => {
  return (
    <>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <progress
          className="progress progress-success w-full"
          value={uploadProgress}
          max="100"
        ></progress>
      )}
    </>
  );
};

export default ProgressBar;
