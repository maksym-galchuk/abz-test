import { clsx } from "clsx";
import styles from "./UsersList.module.scss";
import { useSelector } from "react-redux";
import { getUsersState } from "../../model/selectors/getUsersState";
import { useAppDispatch } from "src/shared/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchUsers } from "../../model/services/fetchUsers";
import { UserCard } from "../UserCard/UserCard";
import { Button } from "src/shared/ui/Button/Button";
import { usersActions } from "../../model/slice/usersSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Loader } from "src/shared/ui/Loader/Loader";
import userAnimations from "./userAnimations.module.scss";
import loaderAnimations from "./loaderAnimations.module.scss";

interface UsersListProps {
  className?: string;
  id?: string;
}

export const UsersList = ({ className, id }: UsersListProps) => {
  const dispatch = useAppDispatch();
  const { users, shownPage, count, isLoading, error, nextQuery } =
    useSelector(getUsersState);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const disabledShowMore = isLoading || !nextQuery;

  const handleShowMore = () => {
    if (users.length < (shownPage + 1) * count) {
      dispatch(fetchUsers());
    }
    dispatch(usersActions.changeShowPage(shownPage + 1));
  };

  return (
    <div className={clsx(styles.usersList, className)} id={id}>
      <h2 className={clsx(styles.title, "font-h1")}>
        Working with GET request
      </h2>
      <TransitionGroup className={styles.list}>
        {users.slice(0, shownPage * count).map((user) => (
          <CSSTransition
            key={user.id}
            timeout={500}
            classNames={{ ...userAnimations }}
          >
            <UserCard user={user} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <CSSTransition
        in={isLoading}
        timeout={200}
        classNames={{ ...loaderAnimations }}
        unmountOnExit
      >
        <Loader className={styles.loader} />
      </CSSTransition>

      {error && <p className={styles.error}>Something went wrong :(</p>}

      <Button onClick={handleShowMore} disabled={disabledShowMore}>
        Show more
      </Button>
    </div>
  );
};
