import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "src/shared/api/api";
import { UsersResponse } from "../types/Users";
import { StateSchema } from "src/app/providers/StoreProvider";

export const fetchUsers = createAsyncThunk<
  UsersResponse,
  void,
  { rejectValue: string; state: StateSchema }
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await $api.get<UsersResponse>("/users", {
      params: { count: 6, ...thunkAPI.getState().users.nextQuery },
    });
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("error");
  }
});
