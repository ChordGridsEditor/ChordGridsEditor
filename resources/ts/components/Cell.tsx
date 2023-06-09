import React from "react";
import { Box, useTheme } from "@mui/material";
import { GridCell, isGridCellSelected, Shape, useGridContext } from "../utils/grid";
import ChordDisplay from "./ChordDisplay";
import { range } from "../utils/misc";

function delimiters(shape: Shape): [ boolean, boolean, boolean, boolean ] {
	return range(shape.length).map(i => shape[i] !== shape[(i + 1) % shape.length]) as any;
}

export interface CellProps {
	cell: GridCell;
	x: number;
	y: number;
}

export function Cell({ cell, x, y }: CellProps) {
	const theme = useTheme();
	const { grid } = useGridContext();

	if (!grid)
		return null;

	const selected = isGridCellSelected(grid, x, y);
	const [ topLeft, topRight, bottomRight, bottomLeft ] = delimiters(cell.shape);
	const svgStyle = { stroke: selected ? theme.palette.primary.main : theme.palette.text.secondary, strokeWidth: 3 };
	return (
		<Box
			position="relative"
			width={100}
			height={100}
			border={2}
			borderColor={selected ? "primary.main" : "text.secondary"}
			overflow="hidden"
		>
			{cell.chords.map((chord, n) => (
				<ChordDisplay key={n} shape={cell.shape} chord={chord} x={x} y={y} n={n} />
			))}
			<svg viewBox="0 0 100 100">
				{topLeft && <line x1={0} y1={0} x2={50} y2={50} {...svgStyle} />}
				{topRight && <line x1={100} y1={0} x2={50} y2={50} {...svgStyle} />}
				{bottomRight && <line x1={100} y1={100} x2={50} y2={50} {...svgStyle} />}
				{bottomLeft && <line x1={0} y1={100} x2={50} y2={50} {...svgStyle} />}
			</svg>
		</Box>
	);
}

export default Cell;
