import styles from "./Input.module.scss";
import { clsx } from "clsx";
import React, { InputHTMLAttributes, memo, useId, useState } from "react";

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
>;

interface InputProps extends HtmlInputProps {
  className?: string;
  helperText?: string;
  value: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    placeholder,
    helperText,
    error,
    ...otherProps
  } = props;

  const inputId = useId();
  const [isPlaceholder, setIsPlaceholder] = useState(!value.length);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onFocus = () => {
    setIsPlaceholder(false);
  };
  const onBlur = () => {
    if (!value) setIsPlaceholder(true);
  };

  return (
    <div
      className={clsx(className, styles.inputWrapper, {
        [styles.invalid]: error,
      })}
    >
      <div className={styles.inputWrapper}>
        <input
          {...otherProps}
          id={inputId}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChangeHandler}
          className={styles.input}
        />
        <label
          htmlFor={inputId}
          className={clsx(styles.label, {
            [styles.isPlaceholder]: isPlaceholder,
          })}
        >
          {placeholder}
        </label>
      </div>
      <label htmlFor={inputId} className={styles.helper}>
        {error || helperText}
      </label>
    </div>
  );
});
