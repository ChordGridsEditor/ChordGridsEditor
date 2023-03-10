import "./App.scss";
import React from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

axios.defaults.baseURL = "/api";

export interface AppProps {

}

export function App({}: AppProps) {
	const onClick = () => {
		axios.get("/health").then(console.log, console.error);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<div className="App">
				<Button variant="contained" color="primary" startIcon={<PublicIcon />} onClick={onClick}>Hello World!</Button>
			</div>
		</ThemeProvider>
	);
}

App.defaultProps = {};

export default App;
