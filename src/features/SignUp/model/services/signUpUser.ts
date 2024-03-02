import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "src/shared/api/api";
import { StateSchema } from "src/app/providers/StoreProvider";
import { convertBlobUrlToFile } from "src/shared/helpers/convertBlobUrlToFile";
import { usersActions } from "src/entities/Users";
import { signUpActions } from "../slice/signUpSlice";

export const signUpUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string; state: StateSchema }
>("signUp/signUpUser", async (_, thunkAPI) => {
  try {
    const { name, email, phone, selectedPosition, photo } =
      thunkAPI.getState().signUpForm;
    const photoFile = await convertBlobUrlToFile(photo.blobUrl, photo.name);
    const response = await $api.postForm("/users", {
      name,
      email,
      phone,
      position_id: selectedPosition.id,
      photo: photoFile,
    });
    // const response = {
    //   status: 201,
    //   data: {
    //     user_id: 15645,
    //   },
    // };
    if (response.status === 201) {
      thunkAPI.dispatch(
        usersActions.addUser({
          id: response.data.user_id,
          name,
          email,
          phone,
          position: selectedPosition.name,
          photo: photo.blobUrl,
          position_id: selectedPosition.id,
        })
      );
      thunkAPI.dispatch(usersActions.changeShowPage(1));
      thunkAPI.dispatch(signUpActions.clearForm());
      return true;
    }

    return false;
  } catch (e: any) {
    const status = e.response.status;
    if (status === 401 || status === 409 || status === 422) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue("Something went wrong :(");
  }
});
