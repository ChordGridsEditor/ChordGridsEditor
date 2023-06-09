import React from "react";
import { Button, Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import SelectableButtonGroup from "./SelectableButtonGroup";
import { ChordModifier, ChordNote, Shape, useGridContext } from "../utils/grid";

export function SideBar() {
	const { grid, dispatch } = useGridContext();

	if (!grid)
		return null;

	const x = grid.selection?.x ?? -1;
	const y = grid.selection?.y ?? -1;
	const n = grid.selection?.n ?? -1;
	const selectedShape = grid.selection ? grid.cells[y][x].shape : undefined;
	const selectedChord = grid.selection ? grid.cells[y][x].chords[n] : undefined;

	return (
		<Paper elevation={3} square sx={{ p: 3 }}>
			<Typography variant="body1" mb={1}>Cell shape</Typography>
			<SelectableButtonGroup
				options={[
					{ value: "0000", label: "□" },
					{ value: "0011", label: "/" },
					{ value: "0012", label: "/-" },
					{ value: "0122", label: "-/" },
					{ value: "0110", label: "\\" },
					{ value: "0120", label: "\\-" },
					{ value: "0112", label: "-\\" },
					{ value: "0123", label: "x" },
					{ value: "0111", label: ">" },
					{ value: "0100", label: "v" },
					{ value: "0010", label: "<" },
					{ value: "0001", label: "^" }
				]}
				selected={selectedShape}
				onSelect={(shape: Shape) => dispatch({ type: "set_cell", x, y, action: { type: "set_shape", shape } })}
				wrap={4}
				disabled={grid.selection === undefined}
			/>
			<Typography variant="body1" mt={2} mb={1}>Note</Typography>
			<FormControlLabel control={
				<Checkbox
					size="small"
					checked={selectedChord?.repeat || false}
					onChange={e => dispatch({
						type: "set_cell",
						x,
						y,
						action: {
							type: "set_chord",
							n,
							action: {
								type: "set_repeat",
								repeat: e.target.checked
							}
						}
					})}
					disabled={grid.selection === undefined}
				/>
			} label="Repeat previous chord (%)" />
			<SelectableButtonGroup
				options={[
					{ value: "C", label: "C" },
					{ value: "D", label: "D" },
					{ value: "E", label: "E" },
					{ value: "F", label: "F" },
					{ value: "G", label: "G" },
					{ value: "A", label: "A" },
					{ value: "B", label: "B" }
				]}
				selected={selectedChord?.note}
				onSelect={(note: ChordNote) => dispatch({ type: "set_cell", x, y, action: { type: "set_chord", n, action: { type: "set_note", note } } })}
				disabled={grid.selection === undefined || selectedChord?.repeat}
			/>
			<Typography variant="body1" mt={2} mb={1}>mM</Typography>
			<SelectableButtonGroup
				options={[
					{ value: true, label: "m" },
					{ value: false, label: "M" }
				]}
				selected={selectedChord?.minor}
				onSelect={minor => dispatch({ type: "set_cell", x, y, action: { type: "set_chord", n, action: { type: "set_minor", minor } } })}
				disabled={grid.selection === undefined || selectedChord?.repeat}
			/>
			<Typography variant="body1" mt={2} mb={1}>b#</Typography>
			<SelectableButtonGroup
				options={[
					{ value: "b", label: "b" },
					{ value: "#", label: "#" },
					{ value: undefined, label: "x" }
				]}
				selected={selectedChord?.modifier}
				onSelect={(modifier: ChordModifier) => dispatch({ type: "set_cell", x, y, action: { type: "set_chord", n, action: { type: "set_modifier", modifier } } })}
				disabled={grid.selection === undefined || selectedChord?.repeat}
			/>
			<Typography variant="body1" mt={2} mb={1}>Rich chord</Typography>
			<SelectableButtonGroup
				options={[
					{ value: 2, label: "2" },
					{ value: 5, label: "5" },
					{ value: 6, label: "6" },
					{ value: 7, label: "7" },
					{ value: 9, label: "9" },
					{ value: 11, label: "11" },
					{ value: 13, label: "13" },
					{ value: undefined, label: "x" }
				]}
				selected={selectedChord?.rich}
				onSelect={(rich: number | undefined) => dispatch({ type: "set_cell", x, y, action: { type: "set_chord", n, action: { type: "set_rich", rich } } })}
				disabled={grid.selection === undefined || selectedChord?.repeat}
			/>
			<Button
				onClick={() => dispatch({ type: "set_cell", x, y, action: { type: "set_chord", n, action: { type: "clear" } } })}
				disabled={grid.selection === undefined}
				sx={{ mt: 2 }}
			>
				Clear
			</Button>
		</Paper>
	);
}

export default SideBar;
