// ** react imports
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
// const themeMode = localStorage.getItem("themeMode") || "light";
// ** main app imports (lazy loading)
const App = lazy(() => import("./App.tsx"));
// ** styles import
import "@/assets/css/index.css";
import { ThemeProvider } from "@emotion/react";
import Loader from "./components/Loader.tsx";
import { DarkTheme, LightTheme } from "./material-them.tsx";
import store from "./store/index.ts";
// import { StyledEngineProvider } from "@mui/material";
const { themeMode } = store.getState().layout;
console.log( "themeMode in main", themeMode)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <ThemeProvider
       theme={ themeMode === "light" ? LightTheme : DarkTheme} >
        <App />
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);
