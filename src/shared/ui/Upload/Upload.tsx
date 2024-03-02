import styles from "./Upload.module.scss";
import { clsx } from "clsx";
import React, { InputHTMLAttributes, memo } from "react";

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface UploadProps extends HtmlInputProps {
  className?: string;
  filename?: string;
  placeholder: string;
  btnText: string;
  error?: string;
  onChange: (value: File) => void;
}

export const Upload = memo((props: UploadProps) => {
  const {
    placeholder,
    filename,
    btnText,
    error,
    className,
    onChange,
    ...otherProps
  } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[0]);
    }
  };

  return (
    <div
      className={clsx(className, styles.upload, { [styles["invalid"]]: error })}
    >
      <label>
        <input
          type="file"
          id="file"
          className={styles.hiddenInput}
          onChange={handleOnChange}
          {...otherProps}
        />
        <span className={styles.customInput}>
          <span className={styles.btnText}>{btnText}</span>
          <span
            className={clsx(styles.filename, { [styles["filled"]]: filename })}
          >
            {filename || placeholder}
          </span>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </span>
      </label>
    </div>
  );
});
