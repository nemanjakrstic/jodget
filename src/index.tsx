import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import "./index.css";

dayjs.extend(duration);
dayjs.extend(localizedFormat);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
