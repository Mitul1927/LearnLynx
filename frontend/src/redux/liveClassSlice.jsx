import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSession: null, // Store current meeting details
};

const liveClassSlice = createSlice({
  name: "liveClass",
  initialState,
  reducers: {
    setActiveSession(state, action) {
      state.activeSession = action.payload; // Update with meeting room code and start time
    },
    clearSession(state) {
      state.activeSession = null; // Clear session data
    },
  },
});

export const { setActiveSession, clearSession } = liveClassSlice.actions;
export default liveClassSlice.reducer;
