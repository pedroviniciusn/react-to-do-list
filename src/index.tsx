import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { TodoProvider } from './contexts/TodoContext';
import reportWebVitals from "./reportWebVitals";
import { makeServer } from './services/mirage';
import "./styles/global.scss";

makeServer();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
);

reportWebVitals();
