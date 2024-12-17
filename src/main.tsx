import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MainApp /> {/* Use the renamed import */}
    </React.StrictMode>
);
