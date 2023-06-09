import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useGridContext } from "../utils/grid";
import Cell from "./Cell";

export function Grid() {
	const { grid, dispatch } = useGridContext();

	return (
		<Paper elevation={1} square sx={{ flex: 1, display: "flex", alignItems: "center", p: 8, overflow: "auto" }}>
			{grid && grid.cells.length && grid.cells[0].length ? (
				<Paper elevation={2} sx={{ display: "flex", p: 4, mx: "auto" }}>
					<Box
						display="grid"
						border={2}
						borderColor="text.secondary"
						sx={{ gridTemplate: `repeat(${grid.cells.length}, 104px) / repeat(${grid.cells[ 0 ].length}, 104px)` }}
					>
						{grid.cells.map((row, y) => row.map((cell, x) => (
							<Cell key={`${y}-${x}`} cell={cell} x={x} y={y}/>
						)))}
					</Box>
				</Paper>
			) : (
				<Button variant="contained" onClick={() => {
					dispatch({ type: "set_title", title: "Chord Grid" });
					dispatch({ type: "set_size", width: 6, height: 3 });
				}} sx={{ mx: "auto" }}>Create grid</Button>
			)}
		</Paper>
	);
}

export default Grid;
