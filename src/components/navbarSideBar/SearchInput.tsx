import { CSSProperties } from "react";
import AsyncSelect from "react-select/async";
import { GroupBase, NoticeProps, StylesConfig } from "react-select";
import { ColourOption, colourOptions, searchInputStyles } from "./searchData";
import { SearchInputProps } from "../../utils/types";

const LoadingMessage = (props: NoticeProps<ColourOption, false>) => {
  return (
    <div
      {...props.innerProps}
      style={props.getStyles("loadingMessage", props) as CSSProperties}
    >
      {props.children}
    </div>
  );
};

const filterColors = (inputValue: string) =>
  colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const promiseOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

const SearchInput: React.FC<SearchInputProps> = ({
  isFocused,
  setIsFocused,
}) => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      styles={
        searchInputStyles as StylesConfig<
          ColourOption,
          false,
          GroupBase<ColourOption>
        >
      }
      components={{ LoadingMessage }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={isFocused ? "w-full" : "w-36"}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#000",
        },
      })}
    />
  );
};

export default SearchInput;
