import React, { useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	createTheme,
	Divider,
	FormControlLabel,
	IconButton,
	Paper,
	ThemeProvider, Tooltip,
	Typography
} from "@mui/material";
import { Edit, Public, ViewQuiltOutlined } from "@mui/icons-material";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";
import SelectableButtonGroup from "./SelectableButtonGroup";
import PopupChangeName from "./PopupChangeName";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

axios.defaults.baseURL = "/api";

export interface AppProps {

}

type Shape = "0000" | "0011" | "0012" | "0122" | "0110" | "0120" | "0112" | "0123" | "0111" | "0100" | "0010" | "0001";
type Chord = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export function App({}: AppProps) {
	const [ anchorMenu1, setAnchorMenu1 ] = useState<HTMLElement>();
	const [ anchorMenu2, setAnchorMenu2 ] = useState<HTMLElement>();
	const [ shape, setShape ] = useState<Shape>("0000");
	const [ chord, setChord ] = useState<Chord>("C");
	const [ popupChangeNameIsOpen, setPopupChangeNameIsOpen ] = useState<boolean>(false);
	const [ appName, setAppName ] = useState<string>("Chord Grids Editor");

	const onClick = () => {
		axios.get("/health").then(console.log, console.error);
	};

	const fileMenu = [
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
	];
	const editMenu = [
		{
			label: "Action menu 2",
			icon: <Public />,
			action: () => console.log("Bouton Action 1 cliqué"),
		}
	];

	return (
		<ThemeProvider theme={darkTheme}>
			<Box display="flex" flexDirection="column" minHeight="100vh">
				<Paper elevation={12} square sx={{ display: "flex", alignItems: "center", p: 1 }}>
					<Box flex={1} display="flex" alignItems="center" columnGap={1}>
						<IconButton onClick={onClick} sx={{ color: "text.secondary", p: 0.75 }}>
							<ViewQuiltOutlined />
						</IconButton>

						<Divider orientation="vertical" flexItem />

						<Button
							variant="text"
							onClick={e => setAnchorMenu1(e.currentTarget)}
							sx={{ color: "text.secondary" }}
						>
							Fichier
						</Button>
						<DropdownMenu anchor={anchorMenu1} onClose={() => setAnchorMenu1(undefined)} menu={fileMenu} />

						<Button
							variant="text"
							onClick={e => setAnchorMenu2(e.currentTarget)}
							sx={{ color: "text.secondary" }}
						>
							Edition
						</Button>
						<DropdownMenu anchor={anchorMenu2} onClose={() => setAnchorMenu2(undefined)} menu={editMenu} />
					</Box>

					<Box position="relative">
						<Typography id="idGridName" variant="body1">{appName}</Typography>
						<IconButton
							sx={{
								position: "absolute",
								left: "calc(100% + 10px)",
								top: "50%",
								transform: "translateY(-50%)",
								color: "text.secondary"
						}}
							onClick={() => setPopupChangeNameIsOpen(true)}
						>
							<Edit />
						</IconButton>

						<PopupChangeName
							currentName={appName}
							setNewName={setAppName}
							open={popupChangeNameIsOpen}
							onClose={() => setPopupChangeNameIsOpen(false)}
						/>
					</Box>

					<Box flex={1} display="flex" alignItems="center" justifyContent="flex-end" columnGap={2}>
						<Button variant="contained" startIcon={<Edit />}>Share</Button>

						<IconButton sx={{ p: 0.5 }}>
							<Avatar sx={{ bgcolor: "text.secondary", width: 28.5, height: 28.5 }}>C</Avatar>
						</IconButton>
					</Box>
				</Paper>
				<Paper elevation={6} square sx={{ display: "flex", alignItems: "center", columnGap: 1, p: 1 }}>
					<Tooltip title="Action 1">
						<IconButton onClick={() => console.log("Action 1")} size="small" sx={{ color: "text.secondary" }}>
							<Public />
						</IconButton>
					</Tooltip>
					<Tooltip title="Action 2">
						<IconButton onClick={() => console.log("Action 2")} size="small" sx={{ color: "text.secondary" }}>
							<Public />
						</IconButton>
					</Tooltip>
				</Paper>
				<Box display="flex" flex={1}>
					<Paper elevation={1} square sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Paper elevation={2} sx={{ width: "75%", height: "75%" }}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consectetur debitis distinctio dolorem ea, eaque eos eum eveniet impedit ipsam maiores molestiae possimus rerum sequi tenetur. Aspernatur commodi consequuntur enim!
						</Paper>
					</Paper>
					<Paper elevation={3} square sx={{ p: 3 }}>
						<Typography variant="body1">Cell shape</Typography>
						<SelectableButtonGroup options={[
							{ value: "0000", label: "0000" },
							{ value: "0011", label: "0011" },
							{ value: "0012", label: "0012" },
							{ value: "0122", label: "0122" },
							{ value: "0110", label: "0110" },
							{ value: "0120", label: "0120" },
							{ value: "0112", label: "0112" },
							{ value: "0123", label: "0123" },
							{ value: "0111", label: "0111" },
							{ value: "0100", label: "0100" },
							{ value: "0010", label: "0010" },
							{ value: "0001", label: "0001" }
						]} selected={shape} onSelect={setShape} wrap={4} />
						<Typography variant="body1">Note</Typography>
						<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Repeat previous chord (%)" />
						<SelectableButtonGroup options={[
							{ value: "C", label: "C" },
							{ value: "D", label: "D" },
							{ value: "E", label: "E" },
							{ value: "F", label: "F" },
							{ value: "G", label: "G" },
							{ value: "A", label: "A" },
							{ value: "B", label: "B" }
						]} selected={chord} onSelect={setChord} />
						<Typography variant="body1">mM</Typography>
						<Typography variant="body1">b#</Typography>
					</Paper>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
App.defaultProps = {};

export default App;
