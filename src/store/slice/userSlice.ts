import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  fullname: string;
  email: string;
  points?: number;
  totalDailyTime?: {
    hours: number;
    minutes: number;
  };
  productivity?: {
    hours_per_task: number;
    total: number;
  };
  tasks?: [];
  token: string;
}

// Retrieve user from localStorage, or use default if none exists
const storedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {};

const initialState: UserState = {
  fullname: storedUser.fullname || "Guest User",
  email: storedUser.email || "",
  tasks: storedUser.tasks || [],
  totalDailyTime: storedUser.totalDailyTime || {
    hours: 0,
    minutes: 0,
  },
  productivity: storedUser.productivity || {
    hours_per_task: 0,
    total: 0,
  },
  points: storedUser.points || 0,
  token: storedUser.token || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.token = action.payload.token;

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.fullname = "Guest User";
      state.email = "";
      state.token = "";

      // Clear user data from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
