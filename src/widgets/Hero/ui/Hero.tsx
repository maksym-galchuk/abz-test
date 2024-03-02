import styles from "./Hero.module.scss";
import { clsx } from "clsx";
import { Button } from "src/shared/ui/Button/Button";
import { scrollToAnchor } from "src/shared/helpers/scrollToAnchor";

interface HeroProps {
  className?: string;
}

export const Hero = ({ className }: HeroProps) => {
  return (
    <div className={clsx(styles.hero, className)}>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>
          Test assignment for front-end developer
        </h1>
        <p className={styles.text}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button onClick={() => scrollToAnchor("form")}>Sign up</Button>
      </div>
    </div>
  );
};
