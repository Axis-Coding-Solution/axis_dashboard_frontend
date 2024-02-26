import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from '@emotion/react'

// ! import main routing file here and use it in the browser router
import AppRouter from "./router";
// ! also store main file would be used here too
import { DarkTheme, LightTheme } from "./material-them";

function App() {
  const { themeMode } = useSelector((store: any) => store.layout)
  return (
    <BrowserRouter>
      <ThemeProvider
        theme={themeMode === "light" ? LightTheme : DarkTheme} >
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

// ** app.tsx is also beneficial for adding root settings in the application as it is the entry point of the app.
