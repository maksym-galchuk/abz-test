import { clsx } from "clsx";
import styles from "./SignUpForm.module.scss";
import { Button } from "src/shared/ui/Button/Button";
import { Input } from "src/shared/ui/Input/Input";
import { useAppDispatch } from "src/shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getSignUpValues } from "../../model/selectors/getSignUpValues";
import React, { useCallback, useEffect, useMemo } from "react";
import { signUpActions } from "../../model/slice/signUpSlice";
import { getSignUpErrors } from "../../model/selectors/getSignUpErrors";
import { fetchPositions } from "../../model/services/fetchPositions";
import { getSignUpPositions } from "../../model/selectors/getSignUpPositions";
import { Radio } from "src/shared/ui/Radio/Radio";
import { Upload } from "src/shared/ui/Upload/Upload";
import { getImageDimensionFromBlob } from "src/shared/helpers/getImageDimensionFromBlob";
import { signUpUser } from "../../model/services/signUpUser";
import { getSignUpIsLoading } from "../../model/selectors/getSignUpIsLoading";
import { Position, SignUpErrors } from "../../model/types/SignUpSchema";
import { getSignUpDone } from "../../model/selectors/getSignUpDone";
import { Done } from "../Done/Done";
import { CSSTransition } from "react-transition-group";
import animations from "./animations.module.scss";
import { Loader } from "../../../../shared/ui/Loader/Loader";

interface SingUpFormProps {
  className?: string;
  id?: string;
}

export const SignUpForm = ({ className, id }: SingUpFormProps) => {
  const dispatch = useAppDispatch();
  const { name, email, phone, selectedPosition, photoName } =
    useSelector(getSignUpValues);
  const positions = useSelector(getSignUpPositions);
  const errors = useSelector(getSignUpErrors);
  const isLoading = useSelector(getSignUpIsLoading);
  const done = useSelector(getSignUpDone);

  useEffect(() => {
    dispatch(fetchPositions());
  }, []);

  const valid = useMemo(() => {
    return (
      !Object.values(errors).some((error) => error) &&
      name &&
      email &&
      phone &&
      selectedPosition.name &&
      photoName
    );
  }, [errors, name, email, phone, selectedPosition, photoName]);

  const clearErrors = useCallback(
    (key: keyof SignUpErrors) => {
      if (errors[key] !== undefined) {
        dispatch(
          signUpActions.setError({
            [key]: undefined,
          })
        );
      }
    },
    [errors]
  );

  const onChangeUsername = useCallback(
    (value: string) => {
      clearErrors("global");
      dispatch(signUpActions.setName(value));
      if (value.length < 2 || value.length > 60) {
        dispatch(
          signUpActions.setError({
            name: "Username should contain 2-60 characters",
          })
        );
      } else {
        clearErrors("name");
      }
    },
    [clearErrors]
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      clearErrors("global");
      dispatch(signUpActions.setEmail(value));
      const emailRegExp =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
      if (value.length < 2 || value.length > 100 || !emailRegExp.test(value)) {
        dispatch(
          signUpActions.setError({
            email: "Invalid email.",
          })
        );
      } else {
        clearErrors("email");
      }
    },
    [clearErrors]
  );

  const onChangePhone = useCallback(
    (value: string) => {
      clearErrors("global");
      dispatch(signUpActions.setPhone(value));
      const phoneRegExp = /^[+]?380([0-9]{9})$/g;
      if (!phoneRegExp.test(value)) {
        dispatch(
          signUpActions.setError({
            phone: "Invalid phone number.",
          })
        );
      } else {
        clearErrors("phone");
      }
    },
    [clearErrors]
  );
  const onPhoneClick = useCallback(() => {
    if (phone.length === 0) {
      dispatch(signUpActions.setPhone("+380"));
    }
  }, [phone]);

  const onChangePosition = useCallback(
    (pos: Position) => {
      clearErrors("global");
      dispatch(signUpActions.setSelectedPosition(pos));
    },
    [clearErrors]
  );

  const onFileChange = useCallback(
    async (file: File) => {
      clearErrors("global");
      const blobUrl = URL.createObjectURL(file);
      const dimensions = await getImageDimensionFromBlob(blobUrl);
      if (dimensions.width < 70 || dimensions.height < 70) {
        dispatch(
          signUpActions.setError({
            photo: "Image should be at least 70x70px",
          })
        );
        return;
      } else if (file.size > 5 * 1024 * 1024) {
        dispatch(
          signUpActions.setError({
            photo: "File size should not exceed 5MB",
          })
        );
        return;
      }
      dispatch(signUpActions.setPhotoName(file.name));
      dispatch(signUpActions.setPhotoBlobUrl(blobUrl));

      clearErrors("photo");
    },
    [clearErrors]
  );

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signUpUser());
  };

  return (
    <div className={clsx(styles.singUpFormWrapper, className)} id={id}>
      <CSSTransition
        in={done}
        timeout={300}
        unmountOnExit
        classNames={{
          ...animations,
        }}
      >
        <Done />
      </CSSTransition>
      {!done && (
        <form className={styles.form} onSubmit={onFormSubmit}>
          <h2 className={clsx(styles.title, "font-h1")}>
            Working with POST request
          </h2>
          <div className={styles.fields}>
            <Input
              className={styles.inputName}
              value={name}
              placeholder={"Your name"}
              onChange={onChangeUsername}
              error={errors.name}
            />
            <Input
              className={styles.inputEmail}
              value={email}
              placeholder={"Email"}
              onChange={onChangeEmail}
              error={errors.email}
            />
            <Input
              className={styles.inputPhone}
              value={phone}
              placeholder={"Phone"}
              onClick={onPhoneClick}
              onChange={onChangePhone}
              error={errors.phone}
              helperText={"+38 (XXX) XXX - XX - XX"}
            />
            <div className={styles.positionsField}>
              <p className={styles.positionsTitle}>Select your position</p>
              <div className={styles.positionsList}>
                {positions.map((item) => (
                  <Radio
                    key={item.id}
                    checked={item.id === selectedPosition.id}
                    text={item.name}
                    onChange={() => onChangePosition(item)}
                  />
                ))}
              </div>
            </div>
            <Upload
              onChange={onFileChange}
              btnText="Upload"
              placeholder="Upload your photo"
              filename={photoName}
              error={errors.photo}
              accept={"image/jpeg, image/jpg"}
            />
          </div>
          <p className={styles.globalError}>{errors.global}</p>
          <CSSTransition
            in={isLoading}
            timeout={300}
            unmountOnExit
            classNames={{
              ...animations,
            }}
          >
            <Loader className={styles.loader} />
          </CSSTransition>
          <Button className={styles.submit} disabled={!valid || isLoading}>
            Sign up
          </Button>
        </form>
      )}
    </div>
  );
};
