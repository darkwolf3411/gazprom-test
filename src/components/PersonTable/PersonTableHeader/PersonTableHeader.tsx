import React, { FC, useState } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MySearch/MyInput";
// @ts-ignore
import styles from "./tHeader.module.scss";

interface Props {
  tableName: string;
  isLoading: boolean;
  onSearch: (event: string) => void;
}

const PersonTableHeader: FC<Props> = ({ isLoading, tableName, onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onClearHandler = () => {
    setSearchValue("");
    onSearch("")
  };
  return (
    <div className={styles.tableHeaderWrapper}>
      <h2>{!isLoading?tableName:"Loading"}</h2>
      {!isLoading && <div className={styles.tableHeaderSearchWrapper}>
        <MyInput
          inputSize={"medium"}
          search={true}
          onClear={onClearHandler}
          placeholder="search"
          value={searchValue}
          onChange={searchChangeHandler}
        />
        <MyButton
          size={"medium"}
          fill={true}
          onClick={() => onSearch(searchValue)}
        >
          search
        </MyButton>
      </div>}
    </div>
  );
};

export default PersonTableHeader;
