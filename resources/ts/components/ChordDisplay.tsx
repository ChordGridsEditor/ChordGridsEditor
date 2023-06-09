import React from "react";
import { Box, Typography } from "@mui/material";
import { Chord, isGridCellSelected, Shape, useGridContext } from "../utils/grid";

const positions = [ "0% 100%", "0% 0%", "100% 0%", "100% 100%" ];

function buildClipPath(shape: Shape, n: number) {
	let path = "polygon(";
	for (let i = 0; i < shape.length; i++)
		if (shape[i] === n.toString())
			path += `${positions[i]}, ${positions[(i + 1) % positions.length]}, 50% 50%, `;
	return path.substring(0, path.length - 2) + ")";
}

const textOffsets: Record<Shape, { top?: string, left?: string, bottom?: string, right?: string, scale?: number }[]> = {
	"0000": [ { top: "50%", left: "50%", scale: 2 } ],
	"0001": [ { top: "20%", left: "50%", scale: 1.5 }, { bottom: "10%", left: "50%" } ],
	"0010": [ { top: "50%", left: "20%", scale: 1.5 }, { top: "50%", right: "10%" } ],
	"0011": [ { top: "20%", left: "20%", scale: 1.25 }, { bottom: "20%", right: "20%", scale: 1.25 } ],
	"0012": [ { top: "20%", left: "20%", scale: 1.25 }, { top: "50%", right: "10%" }, { bottom: "10%", left: "50%" } ],
	"0100": [ { bottom: "20%", left: "50%", scale: 1.5 }, { top: "10%", left: "50%" } ],
	"0110": [ { bottom: "20%", left: "20%", scale: 1.25 }, { top: "20%", right: "20%", scale: 1.25 } ],
	"0111": [ { top: "50%", left: "10%" }, { top: "50%", right: "20%", scale: 1.5 } ],
	"0112": [ { top: "50%", left: "10%" }, { top: "20%", right: "20%", scale: 1.25 }, { bottom: "10%", left: "50%" } ],
	"0120": [ { bottom: "20%", left: "20%", scale: 1.25 }, { top: "10%", left: "50%" }, { top: "50%", right: "10%" } ],
	"0122": [ { top: "50%", left: "10%" }, { top: "10%", left: "50%" }, { bottom: "20%", right: "20%", scale: 1.25 } ],
	"0123": [ { top: "50%", left: "10%" }, { top: "10%", left: "50%" }, { top: "50%", right: "10%" }, { bottom: "10%", left: "50%" } ]
};

function chordToText(chord: Chord) {
	if (!chord)
		return "-";
	if (chord.repeat)
		return "%";
	const modifier = chord.modifier ?? "";
	const isRich7 = chord.rich === 7;
	const minorOrMajor = chord.minor ? isRich7 ? "" : "m" : isRich7 ? "M" : "";
	const rich = chord.rich ?? "";
	return chord.note + modifier + minorOrMajor + rich;
}

export interface ChordDisplayProps {
	shape: Shape;
	chord: Chord;
	x: number;
	y: number;
	n: number;
}

export function ChordDisplay({ shape, chord, x, y, n }: ChordDisplayProps) {
	const { grid, dispatch } = useGridContext();

	if (!grid)
		return null;

	const selected = isGridCellSelected(grid, x, y, n);
	const offset = textOffsets[shape][n];
	return (
		<Box
			position="absolute"
			width={100}
			height={100}
			onClick={() => dispatch({ type: "select", x, y, n })}
			sx={{
				clipPath: buildClipPath(shape, n),
				cursor: "pointer",
				"&:hover": {
					bgcolor: selected ? "action.selected" : "action.hover"
				}
			}}
			bgcolor={selected ? "action.selected" : undefined}
		>
			<Typography
				{...offset}
				position="absolute"
				variant="body2"
				sx={{ transform: `translate(${offset.right ?? ("-" + offset.left)}, ${offset.bottom ?? ("-" + offset.top)}) scale(${offset.scale ?? 1})` }}
			>
				{chordToText(chord)}
			</Typography>
		</Box>
	);
}

export default ChordDisplay;
