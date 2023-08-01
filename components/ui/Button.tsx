import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Button.module.css";

type ButtonProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
};

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${isLoading ? styles.isLoading : ""}`}
    >
      {children}
    </button>
  );
};
export default Button;
