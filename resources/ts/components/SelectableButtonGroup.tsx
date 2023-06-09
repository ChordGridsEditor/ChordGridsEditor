import React, { ReactNode } from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import { arrayChunk } from "../utils/misc";

const WrappedButtonGroup = styled(ButtonGroup)(({ theme, disabled }) => ({
	borderRadius: 0,
	"& .MuiButtonGroup-grouped": {
		borderRadius: 0,
	},
	"&:not(:last-of-type)": {
		borderBottomWidth: 1,
		borderBottomStyle: "solid",
		borderBottomColor: disabled ? theme.palette.action.disabled : theme.palette.primary.dark,
	},
}));

export interface SelectableButtonGroupProps<T> {
	options: {
		value: T;
		label: ReactNode;
	}[];
	selected: T | undefined;
	onSelect: (selected: T) => void;
	wrap?: number;
	disabled?: boolean;
}

export function SelectableButtonGroup<T>({ options, selected, onSelect, wrap, disabled }: SelectableButtonGroupProps<T>) {
	const wrappedOptions = wrap ? arrayChunk(options, wrap) : [ options ];
	return (
		<Box display="flex" flexDirection="column" borderRadius={1} overflow="hidden" width="fit-content">
			{wrappedOptions.map((optionsRow, i) => (
				<WrappedButtonGroup key={i} variant="contained" disabled={disabled}>
					{optionsRow.map((option, j) => (
						<Button
							key={j}
							onClick={() => onSelect(option.value)}
							disabled={disabled}
							sx={{ px: 1.25, py: 0.5, fontSize: 20, bgcolor: selected === option.value ? "primary.dark" : "primary.main", textTransform: "none" }}
						>
							{option.label}
						</Button>
					))}
				</WrappedButtonGroup>
			))}
		</Box>
	);
}

SelectableButtonGroup.defaultProps = {};

export default SelectableButtonGroup;
