import React, { FC, useState } from "react";
import MyButton from "../../UI/MyButton/MyButton";
//@ts-ignore
import styles from "./pTableFooter.module.scss";

interface Props {
  currentPage: number;
  limit: number;
  totalCount: number;
  onSelectChange: (event: number) => void;
  onPageChange: (event: number) => void;
}

const PersonTableFooter: FC<Props> = ({
  limit,
  totalCount,
  currentPage,
  onSelectChange,
  onPageChange,
}) => {
  let lastPage = Math.ceil(totalCount / limit);
  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(Number(event.target.value));
  };
  const changePageHandler = (rotation: "prev" | "next") => {
    if (rotation == "next") {
      onPageChange(currentPage + 1);
    }
    if (rotation == "prev") {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <div className={styles.footerWrapper}>
      <div>
        <select value={limit} onChange={selectChangeHandler}>
          <option value="5">5</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <span> of {totalCount}</span>
      </div>
      <div>
        <MyButton
          size={"small"}
          disabled={currentPage == 1}
          onClick={() => changePageHandler("prev")}
        >
          prev
        </MyButton>
        <MyButton
          size={"small"}
          disabled={lastPage == currentPage}
          onClick={() => changePageHandler("next")}
        >
          next
        </MyButton>
      </div>
    </div>
  );
};

export default PersonTableFooter;
