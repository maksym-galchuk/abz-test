import { createAsyncThunk } from "@reduxjs/toolkit";
import { Position } from "../types/SignUpSchema";
import { $api } from "src/shared/api/api";
import { signUpActions } from "../slice/signUpSlice";

export const fetchPositions = createAsyncThunk<
  Position[],
  void,
  { rejectValue: string }
>("signUp/fetchPositions", async (_, thunkAPI) => {
  try {
    const response = await $api.get<{ positions: Position[] }>("/positions");
    thunkAPI.dispatch(
      signUpActions.setSelectedPosition(response.data.positions[0])
    );
    return response.data.positions;
  } catch (e) {
    return thunkAPI.rejectWithValue("error");
  }
});
