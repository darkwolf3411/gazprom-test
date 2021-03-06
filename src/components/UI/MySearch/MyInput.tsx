import React, { FC, useState } from "react";
import classNames from "classnames/bind";
//@ts-ignore
import {ReactComponent as ClearLogo} from '../../../assets/svg/x-svgrepo-com.svg';
//@ts-ignore
import styles from "./myInput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  search?: boolean;
  inputSize?: "bigger" | "small" | "medium";
  onClear?:()=>void;
}

let cx = classNames.bind(styles);

const MyInput: FC<Props> = ({ onClear, inputSize, search, ...props }) => {
  let className = cx({
    base: true,
    search: search,
  });
  const setInputSize = () => {
    if (inputSize == "bigger") {
      return 21;
    }
    if (inputSize == "small") {
      return 11;
    }
    return 16;
  };
  const onClearHandler =()=>{
    onClear!()
  }
  return (
    <div className={className}>
      <input 
      {...props}
      className={styles.input}
      style={{fontSize: setInputSize()}} />
      {search && <ClearLogo onClick={onClearHandler} />}
    </div>
  );
};

export default MyInput;
