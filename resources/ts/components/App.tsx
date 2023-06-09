import React, { useEffect, useState } from "react";
import { CircularProgress, createTheme, Paper, ThemeProvider } from "@mui/material";
import axios from "axios";
import { Grid, GridContextProvider } from "../utils/grid";
import GridEditionPage from "./GridEditionPage";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

axios.defaults.baseURL = "/api";

export function App() {
	const [ grid, setGrid ] = useState<Grid>();

	useEffect(() => {
		axios.get("/grids/1").then(res => setGrid(res.data));
	}, []);

	return (
		<ThemeProvider theme={darkTheme}>
			{grid ? (
				<GridContextProvider grid={grid}>
					<GridEditionPage />
				</GridContextProvider>
			) : (
				<Paper square sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<CircularProgress />
				</Paper>
			)}
		</ThemeProvider>
	);
}

export default App;
