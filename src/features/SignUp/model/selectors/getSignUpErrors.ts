import type { StateSchema } from "src/app/providers/StoreProvider";

export const getSignUpErrors = (state: StateSchema) => state.signUpForm.errors;
