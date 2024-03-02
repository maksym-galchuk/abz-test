import { UsersSchema } from "src/entities/Users";
import { SignUpSchema } from "src/features/SignUp";

export interface StateSchema {
  users: UsersSchema;
  signUpForm: SignUpSchema;
}
