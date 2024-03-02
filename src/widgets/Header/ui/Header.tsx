import { clsx } from "clsx";
import styles from "./Header.module.scss";
import { scrollToAnchor } from "src/shared/helpers/scrollToAnchor";
import LogoSvg from "src/shared/assets/images/logo.svg?react";
import { Button } from "src/shared/ui/Button/Button";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={clsx(styles.header, className)}>
      <LogoSvg className={styles.logo} />
      <div className={styles.btnGroup}>
        <Button onClick={() => scrollToAnchor("users")}>Users</Button>
        <Button onClick={() => scrollToAnchor("form")}>Sign up</Button>
      </div>
    </header>
  );
};
