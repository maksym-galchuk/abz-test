import { Position, SignUpErrors, SignUpSchema } from "../types/SignUpSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPositions } from "../services/fetchPositions";
import { signUpUser } from "../services/signUpUser";

const initialState: SignUpSchema = {
  name: "",
  email: "",
  phone: "",
  selectedPosition: { id: 0, name: "" },
  positions: [],
  photo: { name: "", blobUrl: "" },
  isLoading: false,
  done: false,
  errors: {},
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPhotoName: (state, action: PayloadAction<string>) => {
      state.photo.name = action.payload;
    },
    setPhotoBlobUrl: (state, action: PayloadAction<string>) => {
      state.photo.blobUrl = action.payload;
    },
    setSelectedPosition: (state, action: PayloadAction<Position>) => {
      state.selectedPosition = action.payload;
    },
    setError: (state, action: PayloadAction<Partial<SignUpErrors>>) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    clearForm: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.selectedPosition = state.positions[0];
      state.photo = { name: "", blobUrl: "" };
      state.errors = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, () => {})
      .addCase(
        fetchPositions.fulfilled,
        (state, action: PayloadAction<Position[]>) => {
          state.positions = action.payload;
        }
      )
      .addCase(fetchPositions.rejected, (state, action) => {
        state.errors.positions = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isLoading = false;
          state.done = action.payload;
        }
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors.global = action.payload;
      });
  },
});

export const { actions: signUpActions } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
