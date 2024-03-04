import { createSlice } from "@reduxjs/toolkit";

const getThemeFromLocalStorage = () =>
  localStorage.getItem("themeMode") || "light";

const initialState = {
  open: false,
  themeMode: getThemeFromLocalStorage(),
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.themeMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    setOpen(state, action) {
      state.open = action.payload
    }
  },
});
export const { setTheme, setOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
