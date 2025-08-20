import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// for learning purpose this will run the code in store.js
// import "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
