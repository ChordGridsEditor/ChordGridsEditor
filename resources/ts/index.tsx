import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

function createDOMRoot() {
	const root = document.createElement("div");
	root.id = "app";
	document.body.appendChild(root);
	return root;
}

const root = createRoot(document.getElementById("app") || createDOMRoot());
root.render(<App />);
