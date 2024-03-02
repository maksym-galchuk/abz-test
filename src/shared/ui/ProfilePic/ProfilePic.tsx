import { clsx } from "clsx";
import styles from "./ProfilePic.module.scss";
import photoCover from "src/shared/assets/images/photo-cover.svg";

interface ProfilePicProps {
  className?: string;
  src: string;
  alt: string;
}

export const ProfilePic = ({ className, src, alt }: ProfilePicProps) => {
  return (
    <object
      className={clsx(styles.profilePic, className)}
      data={src}
      type="image/jpeg"
      width={70}
      height={70}
      aria-label={alt}
    >
      <img src={photoCover} alt="Profile picture fallback" />
    </object>
  );
};
