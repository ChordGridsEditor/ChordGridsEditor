import React, { useState } from "react";
import {
	Box,
	Button,
	createTheme,
	Divider,
	IconButton,
	Paper,
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
	const [ anchorMenu1, setAnchorMenu1 ] = useState<HTMLElement>();
	const [ anchorMenu2, setAnchorMenu2 ] = useState<HTMLElement>();

	const onClick = () => {
		axios.get("/health").then(console.log, console.error);
	};

	const allDropdownMenus: { [key: string]: JSX.Element; } = {
		"fichier":
			<DropdownMenu
				anchor={anchorMenu1}
				onClose={() => setAnchorMenu1(undefined)}
				menu={[
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
										],
									},
								],
							},
						],
					},
				]}
			/>,
		"edition":
			<DropdownMenu
				anchor={anchorMenu2}
				onClose={() => setAnchorMenu2(undefined)}
				menu={[
					{
						label: "Action menu 2",
						icon: <Public />,
						action: () => console.log("Bouton Action 1 cliqué"),
					}
				]}
			/>,
	};

	const displayDropdownMenu = (menuId: string) => {
		const menu = allDropdownMenus[menuId] ?? undefined;
		if(!menu){
			console.error(`Le menuId ${menuId} n'existe pas.`);
			return null;
		}

		return menu;
	}

	const colorBtn = "rgb(110, 109, 92)";

	const btnMargin = { margin: "2px 5px" };

	return (
		<ThemeProvider theme={darkTheme}>
			<Paper elevation={1} square sx={{ minHeight: "100vh" }}>

				<Paper elevation={12} square sx={{ display: "flex", alignItems: "center", color: colorBtn }}>
					<Box flex={1} display="flex" alignItems="center">
						<IconButton color="inherit" onClick={onClick}><Public /></IconButton>

						<Divider color="inherit" orientation="vertical" variant="middle" flexItem />

						<Button variant="text" color="inherit" sx={btnMargin} onClick={e => setAnchorMenu1(e.currentTarget)}>Fichier</Button>
						{displayDropdownMenu("fichier")}

						<Button variant="text" color="inherit" sx={btnMargin} onClick={e => setAnchorMenu2(e.currentTarget)}>Edition</Button>
						{displayDropdownMenu("edition")}
					</Box>

					<Box position="relative">
						<Typography id="idGridName" variant="body1">Chord Grids Editor</Typography>
						<IconButton
							color="inherit"
							sx={{ position: "absolute", left: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" }}
							onClick={() => console.log("Modifier le nom")}
						>
							<Edit />
						</IconButton>
					</Box>

					<Box flex={1} display="flex" alignItems="center" justifyContent="flex-end">
						<Button variant="contained"><Edit />Share</Button>
						<IconButton><AccountCircle /></IconButton>
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
