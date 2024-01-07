import CreatableSelect from "react-select/creatable";
import { TagOption } from "../utils/types";

interface GetAndCreateTagProps {
  tags: string[];
  selectedTags: TagOption[];
  handleTagChange: (value: TagOption[]) => void;
}

const GetAndCreateTag: React.FC<GetAndCreateTagProps> = ({
  tags,
  selectedTags,
  handleTagChange,
}) => {
  const tagOptions: TagOption[] = tags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  return (
    <CreatableSelect
      isMulti
      value={selectedTags}
      onChange={(newValue) => handleTagChange(newValue as TagOption[])}
      options={tagOptions}
    />
  );
};

export default GetAndCreateTag;
