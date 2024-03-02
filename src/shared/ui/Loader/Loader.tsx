import { clsx } from "clsx";
import styles from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return <div className={clsx(styles.loader, className)}></div>;
};
