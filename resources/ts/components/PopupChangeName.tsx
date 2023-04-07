import React from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from "@mui/material";

import { Check, Close } from "@mui/icons-material";


export function PopupChangeName({ currentName, setNewName, open, onClose }: any) {
	const handleValidateNewName = () => {
		const newName = (document.getElementById("myNewNameInputId") as HTMLInputElement).value;
		setNewName(newName);
		onClose();
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Rename chord grid</DialogTitle>

			<DialogContent>
				<DialogContentText>
					The name is shown on the chord grid when exporting, in the
					list of your grids, and when sharing the grid with someone.
				</DialogContentText>

				<TextField
					required
					id="myNewNameInputId"
					label="Name"
					defaultValue={currentName}
					helperText="The name of the song is usually a good choice"
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} color="error" endIcon={<Close />}>
					Cancel
				</Button>
				<Button onClick={handleValidateNewName} endIcon={<Check />}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}


PopupChangeName.defaultProps = {};
export default PopupChangeName;
