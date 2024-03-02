import type { StateSchema } from "src/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getSignUpName = (state: StateSchema) => state.signUpForm.name;
const getSignUpPhone = (state: StateSchema) => state.signUpForm.phone;
const getSignUpEmail = (state: StateSchema) => state.signUpForm.email;
const getSignUpSelectedPosition = (state: StateSchema) =>
  state.signUpForm.selectedPosition;
const getSignUpPhotoName = (state: StateSchema) => state.signUpForm.photo.name;

export const getSignUpValues = createSelector(
  [
    getSignUpName,
    getSignUpPhone,
    getSignUpEmail,
    getSignUpSelectedPosition,
    getSignUpPhotoName,
  ],
  (name, phone, email, selectedPosition, photoName) =>
    ({
      name,
      phone,
      email,
      selectedPosition,
      photoName,
    } as const)
);
