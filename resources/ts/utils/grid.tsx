import React, { Dispatch, useReducer } from "react";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { range } from "./misc";

export type Shape = "0000" | "0011" | "0012" | "0122" | "0110" | "0120" | "0112" | "0123" | "0111" | "0100" | "0010" | "0001";
export type ChordNote = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type ChordModifier = "b" | "#" | undefined;

export function numberOfChordsInShape(shape: Shape): number {
	return Math.max(...shape.split("").map(n => parseInt(n))) + 1;
}

export type Chord = {
	repeat: boolean;
	note: ChordNote;
	modifier: ChordModifier;
	minor: boolean;
	rich: number | undefined;
} | undefined;

export interface GridCell {
	shape: Shape;
	chords: Chord[];
}

export const emptyGridCell = (): GridCell => ({ shape: "0000", chords: [ undefined ] });
export const defaultChord = (): NonNullable<Chord> => ({ repeat: false, note: "C", modifier: undefined, minor: false, rich: undefined });
export const isGridCellSelected = (grid: Grid, x: number, y: number, n?: number) => grid.selection && grid.selection.x === x && grid.selection.y === y && (n === undefined || grid.selection.n === n);

export interface Grid {
	id: number;
	title: string;
	cells: GridCell[][];
	selection?: {
		x: number;
		y: number;
		n: number;
	};
}

export type GridAction = {
	type: "set_title";
	title: string;
} | {
	type: "set_size";
	width: number;
	height: number;
} | {
	type: "set_cell";
	x: number;
	y: number;
	action: {
		type: "set_shape";
		shape: Shape;
	} | {
		type: "set_chord";
		n: number;
		action: {
			type: "clear";
		} | {
			type: "set_repeat";
			repeat: boolean;
		} | {
			type: "set_note";
			note: ChordNote;
		} | {
			type: "set_modifier";
			modifier: ChordModifier;
		} | {
			type: "set_minor";
			minor: boolean;
		} | {
			type: "set_rich";
			rich: number | undefined;
		};
	};
} | {
	type: "select";
	x: number;
	y: number;
	n: number;
} | {
	type: "unselect";
};

function gridReducer(grid: Grid, action: GridAction): Grid {
	console.info("Alter grid: " + JSON.stringify(action, null, 2));
	switch (action.type) {
		case "set_title":
			return { ...grid, title: action.title };
		case "set_size":
			return {
				...grid,
				cells: range(action.height).map(y => {
					const row = grid.cells[y] ?? [];
					return range(action.width).map(x => row[x] ?? emptyGridCell());
				})
			};
		case "set_cell": {
			const cellAction = action.action;
			return {
				...grid,
				cells: grid.cells.map((row, y): GridCell[] => {
					if (y === action.y) {
						return row.map((cell, x): GridCell => {
							if (x === action.x) {
								switch (cellAction.type) {
									case "set_shape": {
										const shape = cellAction.shape;
										const nChords = numberOfChordsInShape(shape);
										if (grid.selection?.x === x && grid.selection.y === y && grid.selection.n >= nChords)
											grid.selection.n = nChords - 1;
										return { ...cell, shape, chords: range(nChords).map(i => cell.chords[i]) };
									}
									case "set_chord": {
										const chordAction = cellAction.action;
										return {
											...cell,
											chords: cell.chords.map((chord, n): Chord => {
												if (n === cellAction.n) {
													switch (chordAction.type) {
														case "clear":
															return undefined;
														case "set_repeat":
															return { ...(chord ?? defaultChord()), repeat: chordAction.repeat };
														case "set_note":
															return { ...(chord ?? defaultChord()), note: chordAction.note };
														case "set_modifier":
															return { ...(chord ?? defaultChord()), modifier: chordAction.modifier };
														case "set_minor":
															return { ...(chord ?? defaultChord()), minor: chordAction.minor };
														case "set_rich":
															return { ...(chord ?? defaultChord()), rich: chordAction.rich };
													}
													throw new Error("Unknown grid cell chord action to dispatch");
												} else
													return chord;
											})
										};
									}
								}
								throw new Error("Unknown grid cell action to dispatch");
							} else
								return cell;
						});
					} else
						return row;
				})
			};
		}
		case "select":
			return { ...grid, selection: { x: action.x, y: action.y, n: action.n } };
		case "unselect":
			return { ...grid, selection: undefined };
	}
	throw new Error("Unknown grid action to dispatch");
}

export interface GridContextType {
	grid: Grid | null;
	dispatch: Dispatch<GridAction>;
}

export const GridContext = createContext<GridContextType>({
	grid: null,
	dispatch: () => {
		throw new Error("Cannot dispatch grid action out of context");
	}
});

export const useGridContext = () => useContext(GridContext);

export interface GridContextProviderProps extends PropsWithChildren {
	grid: Grid;
}

export function GridContextProvider({ grid, children }: GridContextProviderProps) {
	const [ grid_, dispatch ] = useReducer(gridReducer, grid);
	const context = useMemo(() => ({ grid: grid_, dispatch }), [ grid_ ]);
	return <GridContext.Provider value={context} children={children} />;
}
