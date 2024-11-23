import { createSlice } from "@reduxjs/toolkit";

// Initial state for the notification
const initialState = {
  title: "Default Title",
  body: "Default Body",
  data: { hello: "world" },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.title = action.payload.title || state.title;
      state.body = action.payload.body || state.body;
      state.data = action.payload.data || state.data;
    },
    triggerNotification: (state) => {
      const title = state.title || "Default Title";
      const body = state.body || "Default Body";
      const data = state.data ? { ...state.data } : { hello: "world" };

      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          try {
            const notification = new Notification(title, {
              body: body,
              data: data,
            });
            notification.addEventListener("close", () =>
              alert("Notification closed")
            );
          } catch (error) {
            console.error("Error creating notification:", error);
          }
        }
      });
    },
  },
});

export const { setNotification, triggerNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
