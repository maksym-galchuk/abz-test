import { User, UsersSchema } from "../types/Users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/fetchUsers";

const initialState: UsersSchema = {
  users: [],
  isLoading: false,
  shownPage: 1,
  count: 6,
  offset: 0,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
      state.offset = 1;
    },
    changeShowPage: (state, action: PayloadAction<number>) => {
      state.shownPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.users = [
          ...state.users,
          ...action.payload.users.slice(state.offset),
        ];
        if (state.offset) {
          state.offset = 0;
        }
        if (action.payload.total_pages === action.payload.page) {
          state.nextQuery = undefined;
        } else {
          state.nextQuery = {
            page: action.payload.page + 1,
            count: action.payload.count,
          };
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
