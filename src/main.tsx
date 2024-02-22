// ** react imports
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

// ** main app imports (lazy loading)
const App = lazy(() => import("./App.tsx"));

// ** styles import
import "@/assets/css/index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./material-them.tsx";
import Loader from "./components/Loader.tsx";
// import { StyledEngineProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
     <ThemeProvider theme={theme} >
        <App />
     </ThemeProvider> 
    </Suspense>
  </StrictMode>
);
