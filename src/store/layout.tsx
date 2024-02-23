import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    open: false,
    themeMode: "light",
}


const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
      setTheme(state, action) {
        state.themeMode = action.payload
       
        // state.themeMode = action.payload;
        // localStorage.setItem("themeMode", action.payload);
        // if (action.payload === "light") {
        //   document.body.style.backgroundColor = "white";
        // } else {
        //   document.body.style.backgroundColor = "#111827";
        // }
      }
    },
});
export const { setTheme } = layoutSlice.actions;
export default layoutSlice.reducer