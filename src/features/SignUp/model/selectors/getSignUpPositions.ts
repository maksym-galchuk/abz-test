import type { StateSchema } from "src/app/providers/StoreProvider";

export const getSignUpPositions = (state: StateSchema) =>
  state.signUpForm.positions;
