import React from "react";
import { Button, createTheme, IconButton, Paper, ThemeProvider } from "@mui/material";
import { Public } from "@mui/icons-material";
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
			<Paper elevation={1} square sx={{ minHeight: "100vh" }}>
				<Paper elevation={12} square>
					<IconButton color="primary" aria-label="Action XYZ ?" onClick={onClick}><Public /></IconButton>
					<Button variant="text" color="primary" onClick={onClick}>Menu 1</Button>
					<Button variant="text" color="primary" onClick={onClick}>Menu 2</Button>
					<Button variant="text" color="primary" onClick={onClick}>Menu 3</Button>
				</Paper>
				<Paper elevation={6} square>
					<IconButton color="primary" aria-label="Action XYZ ?" onClick={onClick}><Public /></IconButton>
				</Paper>
			</Paper>
		</ThemeProvider>
	);
}

App.defaultProps = {};

export default App;
