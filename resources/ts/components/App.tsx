import React, { useState } from "react";
import {
	Avatar,
	Box,
	Button,
	createTheme,
	Divider,
	IconButton,
	Paper,
	TextField,
	ThemeProvider,
	Typography
} from "@mui/material";
import { AccountCircle, Edit, Public } from "@mui/icons-material";
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
				<Paper elevation={12} square sx={{ display: "flex", alignItems: "center" }}>
					<Box flex={1} display="flex" alignItems="center">
						<IconButton color="primary" onClick={onClick}><Public /></IconButton>

						<Divider orientation="vertical" variant="middle" flexItem />

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
							{
								label: "truc",
								icon: <Public />,
								children: [
									{
										label: "truc",
										icon: <Public />,
										children: [
											{
												label: "truc",
												icon: <Public />,
												children: [
													{
														label: "subaction 5",
														icon: <Public />,
														action: () => console.log("Bouton subaction 5 cliqué"),
													},
												]
											},
										]
									},
								]
							},
						]} />

						<Button variant="text" color="primary" onClick={onClick}>Menu 2</Button>

						<Button variant="text" color="primary" onClick={onClick}>Menu 3</Button>
					</Box>

					<Box position="relative">
						<Typography id="idGridName" variant="body1">Chord Grids Editor</Typography>
						<IconButton
							color="primary"
							sx={{ position: "absolute", left: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" }}
							onClick={() => console.log("Modifier le nom")}
						>
							<Edit />
						</IconButton>
					</Box>

					<Box flex={1} display="flex" alignItems="center" justifyContent="flex-end">
						<Button variant="contained"><Edit />Share</Button>
						<IconButton>
							<AccountCircle />
						</IconButton>
					</Box>
				</Paper>
				<Paper elevation={6} square>
					<IconButton color="primary" onClick={onClick}><Public /></IconButton>
				</Paper>
			</Paper>
		</ThemeProvider>
	);
}

App.defaultProps = {};

export default App;
