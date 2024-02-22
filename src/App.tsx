import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppRouter from "./router";
import store from "./store";

// ! import main routing file here and use it in the browser router

// ! also store main file would be used here too

function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
  );
}

export default App;

// ** app.tsx is also beneficial for adding root settings in the application as it is the entry point of the app.
