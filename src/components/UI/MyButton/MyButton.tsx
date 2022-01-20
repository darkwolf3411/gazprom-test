import React, { FC } from "react";
import classNames from "classnames/bind";
//@ts-ignore
import styles from "./myButton.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fill?: boolean;
  size?: "bigger" | "small" | "medium";
}

let cx = classNames.bind(styles);

const MyButton: FC<Props> = ({ fill, size, children, ...props }) => {
  let className = cx({
    base: true,
    fill: fill,
    disabled: props.disabled,
  });
  const setButtonSize = () => {
    if (size == "bigger") {
      return 25;
    }
    if (size == "small") {
      return 15;
    }
    return 20;
  };
  return (
    <button
      {...props}
      style={{ fontSize: setButtonSize() }}
      className={className}
    >
      {children}
    </button>
  );
};

export default MyButton;
