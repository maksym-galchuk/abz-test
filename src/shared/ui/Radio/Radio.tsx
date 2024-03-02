import { clsx } from "clsx";
import styles from "./Radio.module.scss";
import { memo } from "react";

interface RadioProps {
  className?: string;
  text: string;
  checked: boolean;
  onChange: () => void;
}

export const Radio = memo(
  ({ className, checked, text, onChange }: RadioProps) => {
    const handleChange = () => {
      onChange();
    };

    return (
      <label className={clsx(styles.wrapper, className)}>
        <input
          type="radio"
          name="radio"
          checked={checked}
          onChange={handleChange}
          className={styles.radioInput}
        />
        {text}
      </label>
    );
  }
);
