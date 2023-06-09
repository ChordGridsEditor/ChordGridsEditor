import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	Divider,
	IconButton,
	Paper, Snackbar, TextField,
	Tooltip,
	Typography
} from "@mui/material";
import { Close, Edit, GridOn, Save, TextFields, ViewQuiltOutlined } from "@mui/icons-material";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";
import SideBar from "./SideBar";
import { useGridContext } from "../utils/grid";
import Grid from "./Grid";

export function GridEditionPage() {
	const { grid, dispatch } = useGridContext();
	const [ anchorMenu1, setAnchorMenu1 ] = useState<HTMLElement>();
	const [ anchorMenu2, setAnchorMenu2 ] = useState<HTMLElement>();
	const [ saveStatus, setSaveStatus ] = useState<"saving" | "saved" | "error">();
	const [ renaming, setRenaming ] = useState(false);
	const [ resizing, setResizing ] = useState(false);
	const [ newTitle, setNewTitle ] = useState(grid?.title ?? "Chord Grid");
	const [ width, setWidth ] = useState(grid?.cells[0]?.length ?? 0);
	const [ height, setHeight ] = useState(grid?.cells.length ?? 0);

	useEffect(() => {
		setNewTitle(grid?.title ?? "Chord Grid");
	}, [ grid?.title ]);

	useEffect(() => {
		setWidth(grid?.cells[0]?.length ?? 0);
		setHeight(grid?.cells.length ?? 0);
	}, [ grid?.cells ]);

	const save = () => {
		setSaveStatus("saving");
		axios.post(`/grids/${grid?.id}`, grid).then(() => setSaveStatus("saved"), () => setSaveStatus("error"));
	};

	const fileMenu = [
		{
			label: "Save grid",
			icon: <Save />,
			shortcut: "Ctrl+S",
			action: save,
		},
		// {
		// 	label: "Action 2",
		// 	icon: <Public />,
		// 	hasDividerBelow: true,
		// 	action: () => console.log("Bouton Action 2 cliqué"),
		// },
		// {
		// 	label: "Action 3",
		// 	icon: <Public />,
		// 	action: () => console.log("Bouton Action 3 cliqué"),
		// },
		// {
		// 	label: "truc",
		// 	icon: <Public />,
		// 	children: [
		// 		{
		// 			label: "truc",
		// 			icon: <Public />,
		// 			children: [
		// 				{
		// 					label: "truc",
		// 					icon: <Public />,
		// 					children: [
		// 						{
		// 							label: "subaction 5",
		// 							icon: <Public />,
		// 							action: () => console.log("Bouton subaction 5 cliqué"),
		// 						},
		// 					],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
	];
	const editMenu = [
		{
			label: "Grid title",
			icon: <TextFields />,
			action: () => setRenaming(true),
		},
		{
			label: "Grid size",
			icon: <GridOn />,
			action: () => setResizing(true),
		}
	];

	return (
		<Box display="flex" flexDirection="column" minHeight="100vh">
			<Paper elevation={12} square sx={{ display: "flex", alignItems: "center", p: 1 }}>
				<Box flex={1} display="flex" alignItems="center" columnGap={1}>
					<IconButton sx={{ color: "text.secondary", p: 0.75 }}>
						<ViewQuiltOutlined />
					</IconButton>

					<Divider orientation="vertical" flexItem />

					<Button
						variant="text"
						onClick={e => setAnchorMenu1(e.currentTarget)}
						sx={{ color: "text.secondary" }}
					>
						File
					</Button>
					<DropdownMenu anchor={anchorMenu1} onClose={() => setAnchorMenu1(undefined)} menu={fileMenu} />

					<Button
						variant="text"
						onClick={e => setAnchorMenu2(e.currentTarget)}
						sx={{ color: "text.secondary" }}
					>
						Edit
					</Button>
					<DropdownMenu anchor={anchorMenu2} onClose={() => setAnchorMenu2(undefined)} menu={editMenu} />
				</Box>

				<Box position="relative">
					<Typography variant="body1">{grid?.title ?? "Chord Grid"}</Typography>
					<IconButton
						sx={{
							position: "absolute",
							left: "calc(100% + 10px)",
							top: "50%",
							transform: "translateY(-50%)",
							color: "text.secondary"
						}}
						onClick={() => setRenaming(true)}
					>
						<Edit />
					</IconButton>
				</Box>

				<Box flex={1} display="flex" alignItems="center" justifyContent="flex-end" columnGap={2}>
					<Button variant="contained" startIcon={<Edit />}>Share</Button>

					<IconButton sx={{ p: 0.5 }}>
						<Avatar sx={{ bgcolor: "text.secondary", width: 28.5, height: 28.5 }}>C</Avatar>
					</IconButton>
				</Box>
			</Paper>
			<Paper elevation={6} square sx={{ display: "flex", alignItems: "center", columnGap: 1, p: 1 }}>
				<Tooltip title="Save">
					<IconButton onClick={save} size="small" sx={{ color: "text.secondary" }}>
						<Save />
					</IconButton>
				</Tooltip>
				<Tooltip title="Resize">
					<IconButton onClick={() => setResizing(true)} size="small" sx={{ color: "text.secondary" }}>
						<GridOn />
					</IconButton>
				</Tooltip>
			</Paper>
			<Box display="flex" flex={1}>
				<Grid />
				<SideBar />
			</Box>
			<Dialog open={renaming} onClose={() => setRenaming(false)}>
				<DialogTitle>Rename chord grid</DialogTitle>
				<Divider />
				<DialogContent>
					<DialogContentText>
						The name is shown on the chord grid when exporting, in the list of your grids, and when sharing the grid with someone.
					</DialogContentText>
					<TextField
						autoFocus
						label="Name"
						fullWidth
						variant="standard"
						value={newTitle}
						onChange={e => setNewTitle(e.target.value)}
						helperText="The name of the song is usually a good choice"
						sx={{ mt: 2 }}
					/>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={() => setRenaming(false)} color="error">Cancel</Button>
					<Button onClick={() => {
						dispatch({ type: "set_title", title: newTitle });
						setRenaming(false);
					}} disabled={!newTitle}>Confirm</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={resizing} onClose={() => setResizing(false)}>
				<DialogTitle>Resize grid</DialogTitle>
				<Divider />
				<DialogContent>
					<TextField
						autoFocus
						id="name"
						label="Columns"
						type="number"
						fullWidth
						variant="standard"
						value={width}
						onChange={e => setWidth(parseInt(e.target.value) ?? 0)}
					/>
					<TextField
						id="name"
						label="Rows"
						type="number"
						fullWidth
						variant="standard"
						value={height}
						onChange={e => setHeight(parseInt(e.target.value) ?? 0)}
						sx={{ mt: 2 }}
					/>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button onClick={() => setResizing(false)} color="error">Cancel</Button>
					<Button onClick={() => {
						dispatch({ type: "set_size", width, height });
						setResizing(false);
					}} disabled={!width || !height}>Confirm</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={!!saveStatus}
				onClose={() => setSaveStatus(undefined)}
				message={saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : saveStatus === "error" ? "An error occured" : ""}
				action={
					saveStatus === "saving" ? <CircularProgress size="small" /> : <IconButton
						size="small"
						color="inherit"
						onClick={() => setSaveStatus(undefined)}
					>
						<Close fontSize="small" />
					</IconButton>
				}
			/>
		</Box>
	);
}

export default GridEditionPage;
