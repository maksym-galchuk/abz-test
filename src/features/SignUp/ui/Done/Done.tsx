import { clsx } from "clsx";
import styles from "./Done.module.scss";
import React from "react";
import SuccessImg from "src/shared/assets/images/success-image.svg?react";

interface DoneProps {
  className?: string;
}

export const Done = ({ className }: DoneProps) => {
  return (
    <div className={clsx(styles.done, className)}>
      <h2 className={clsx(styles.title, "font-h1")}>
        User successfully registered
      </h2>
      <SuccessImg className={styles.img} />
    </div>
  );
};
