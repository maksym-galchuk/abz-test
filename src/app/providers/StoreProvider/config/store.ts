import { StateSchema } from "./StateSchema";
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { usersReducer } from "src/entities/Users";
import { signUpReducer } from "src/features/SignUp";

const rootReducer: ReducersMapObject<StateSchema> = {
  users: usersReducer,
  signUpForm: signUpReducer,
};

export const store = configureStore<StateSchema>({
  reducer: rootReducer,
  devTools: true,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
