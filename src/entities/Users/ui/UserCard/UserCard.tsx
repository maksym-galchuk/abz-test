import { clsx } from "clsx";
import styles from "./UserCard.module.scss";
import { User } from "../../model/types/Users";
import { ProfilePic } from "src/shared/ui/ProfilePic/ProfilePic";
import { Tooltip } from "src/shared/ui/Tooltip/Tooltip";
import { memo } from "react";

interface UserCardProps {
  user: User;
}

export const UserCard = memo(({ user }: UserCardProps) => {
  const match = user.phone.match(/^\+(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  let formattedPhone = user.phone;
  if (match) {
    formattedPhone = `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  }

  return (
    <div className={clsx(styles.userCard)}>
      <ProfilePic
        className={styles.pfp}
        src={user.photo}
        alt={`${user.name} photo`}
      />
      <Tooltip className={styles.tooltip} text={user.name} />
      <div className={styles.bottomGroup}>
        <Tooltip className={styles.tooltip} text={user.position} />
        <Tooltip text={user.email} />
        <Tooltip text={formattedPhone} />
      </div>
    </div>
  );
});
