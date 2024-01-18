import CreatableSelect from "react-select/creatable";
import { TagOption } from "../../utils/types";
import useGetTags from "../../hooks/useGetTags";

interface GetAndCreateTagProps {
  selectedTags: TagOption[];
  handleTagChange: (value: TagOption[]) => void;
}

const GetAndCreateTag: React.FC<GetAndCreateTagProps> = ({
  selectedTags,
  handleTagChange,
}) => {
  const tags: string[] = useGetTags();

  const tagOptions: TagOption[] = tags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="section-tags">Choose Tags</label>
      <CreatableSelect
        styles={{
          placeholder: (base) => ({
            ...base,
            color: "white",
          }),
          input: (base) => ({
            ...base,
            color: "white",
          }),

          multiValue: (base) => ({
            ...base,
            color: "#313D4A",
            backgroundColor: "whitesmoke",
          }),
          container: (base) => ({
            ...base,
            transition: "width 1s ease-in-out",
            backgroundColor: "#313D4A",
            color: "white",
          }),
          control: (base) => ({
            ...base,
            backgroundColor: "#313D4A",
            color: "white",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#313D4A",
            color: "white",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#000",
          },
        })}
        isMulti
        value={selectedTags}
        onChange={(newValue) => handleTagChange(newValue as TagOption[])}
        options={tagOptions}
      />
    </div>
  );
};

export default GetAndCreateTag;
