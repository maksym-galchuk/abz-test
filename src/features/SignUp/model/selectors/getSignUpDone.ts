import type { StateSchema } from "src/app/providers/StoreProvider";

export const getSignUpDone = (state: StateSchema) => state.signUpForm.done;
