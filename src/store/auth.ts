// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// import { User } from "firebase/auth";

// interface SliceState {
//   user: Partial<User> | null;
// }

// const initialState: SliceState = { user: null };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<Partial<User>>) {
//       state.user = action.payload;
//     },
//     removeUser(state) {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, removeUser } = authSlice.actions;

// export const selectUser = (store: RootState) => store.authSlice.user;

// export default authSlice.reducer;

// // TODO: Remove redux
