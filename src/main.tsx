import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </AuthProvider>
  </React.StrictMode>,
);

/*Context files wrappes app. Auth and Menu is always supposed to be "active"*/
