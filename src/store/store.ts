import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import screenShareReducer from "./slice/screenShareSlice";
import notificationReducer from "./slice/NotificationsSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    screenShare: screenShareReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
