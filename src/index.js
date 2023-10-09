import React from "react";
import ReactDOM from "react-dom";
import "./asset/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux-persist/store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootElement
);

reportWebVitals();
