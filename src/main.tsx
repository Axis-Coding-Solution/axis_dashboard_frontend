// ** react imports
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// ** main app imports (lazy loading)
const App = lazy(() => import("./App.tsx"));

// ** styles import
import "@/assets/css/index.css";

import Loader from "./components/Loader.tsx";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
