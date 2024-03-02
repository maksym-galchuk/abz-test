import styles from "./Button.module.scss";
import { clsx } from "clsx";
import { ButtonHTMLAttributes, memo, PropsWithChildren } from "react";

export enum ButtonTheme {
  YELLOW = "yellow",
}

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
}

export const Button = memo((props: ButtonProps) => {
  const {
    theme = ButtonTheme.YELLOW,
    children,
    className,
    ...otherProps
  } = props;
  return (
    <button
      {...otherProps}
      className={clsx(styles.btn, className, styles[theme])}
    >
      {children}
    </button>
  );
});
