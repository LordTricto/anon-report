import "./index.css";

import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { persistor } from "./redux/store";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    {/* <PersistGate persistor={persistor}> */}
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

