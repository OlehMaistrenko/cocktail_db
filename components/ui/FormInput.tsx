import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FormInput.module.css";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={`${errors[name] ? styles.invalid : ""}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        placeholder=' '
        className={styles.input}
        {...register(name)}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name]?.message as string}</span>
      )}
    </div>
  );
};

export default FormInput;
