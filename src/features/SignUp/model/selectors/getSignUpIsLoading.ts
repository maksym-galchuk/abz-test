import type { StateSchema } from "src/app/providers/StoreProvider";

export const getSignUpIsLoading = (state: StateSchema) =>
  state.signUpForm.isLoading;
