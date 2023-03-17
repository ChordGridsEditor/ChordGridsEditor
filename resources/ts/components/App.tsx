import React, { useState } from "react";
import { Button, createTheme, IconButton, MenuItem, Paper, ThemeProvider } from "@mui/material";
import { Public } from "@mui/icons-material";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

axios.defaults.baseURL = "/api";

export interface AppProps {

}

export function App({}: AppProps) {
	const [ anchor, setAnchor ] = useState<HTMLElement>();

	const onClick = () => {
		axios.get("/health").then(console.log, console.error);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Paper elevation={1} square sx={{ minHeight: "100vh" }}>
				<Paper elevation={12} square>
					<IconButton color="primary" aria-label="Action XYZ ?" onClick={onClick}><Public /></IconButton>
					<Button variant="text" color="primary" onClick={e => setAnchor(e.currentTarget)}>Menu 1</Button>
					<DropdownMenu anchor={anchor} onClose={() => setAnchor(undefined)} menu={[
						{
							label: "Action 1",
							icon: <Public />,
							shortcut: "Ctrl+S",
							action: () => console.log("Bouton Action 1 cliqué"),
						},
						{
							label: "Action 2",
							icon: <Public />,
							hasDividerBelow: true,
							action: () => console.log("Bouton Action 2 cliqué"),
						},
						{
							label: "Action 3",
							icon: <Public />,
							action: () => console.log("Bouton Action 3 cliqué"),
						},
					]}/>
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
