import MDEditor from "@uiw/react-md-editor";

interface MarkdownFieldProps {
  value: string;
  setValue: (value: string) => void;
}

export const MarkdownField: React.FC<MarkdownFieldProps> = ({
  value,
  setValue,
}) => {
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(newValue) => setValue(newValue || "")}
        preview="edit"
        style={{
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
};
