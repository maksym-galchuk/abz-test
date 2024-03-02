import { clsx } from "clsx";
import styles from "./Tooltip.module.scss";
import React, { useMemo, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";

interface TooltipProps {
  className?: string;
  text: string;
}

export const Tooltip = ({ className, text }: TooltipProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [windowWidth] = useWindowSize();

  const tooltipPos = useMemo(
    () => ref.current?.getBoundingClientRect().left || 0,
    [ref.current, windowWidth]
  );

  const handleMouseEnter = (e: React.MouseEvent) => {
    setTimeout(() => {
      setTooltipX(e.clientX - tooltipPos);
      setHovered(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHovered(false);
      setTooltipX(0);
    }, 100);
  };

  return (
    <div ref={ref} className={clsx(styles.tooltip, className)}>
      <p className={styles.text}>
        <span onMouseMove={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {text}
        </span>
      </p>
      <span
        style={{
          left: tooltipX,
          maxWidth: `calc(100vw - ${tooltipPos + tooltipX + 20}px)`,
        }}
        className={clsx(styles.hoverText, {
          [styles.active]: hovered,
        })}
      >
        {text}
      </span>
    </div>
  );
};
