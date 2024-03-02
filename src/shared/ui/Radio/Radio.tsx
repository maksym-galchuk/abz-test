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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange();
    };

    return (
      <label className={styles.wrapper}>
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
