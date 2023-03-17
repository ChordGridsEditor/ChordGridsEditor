import React from "react";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";

export interface MenuElementBase {
	label: string;
	icon: any;
	shortcut?: string;
	hasDividerBelow?: boolean;
}

export interface MenuAction extends MenuElementBase {
	action: () => void;
}

export interface MenuWithSubMenus extends MenuElementBase {
	children: MenuElement[];
}

export type MenuElement = MenuAction | MenuWithSubMenus;

export interface DropdownMenuProps {
	anchor?: HTMLElement;
	onClose: () => void;
	menu: MenuElement[];
}
export function DropdownMenu({ anchor, onClose, menu }: DropdownMenuProps) {
	return (
		<Menu open={!!anchor} anchorEl={anchor} onClose={onClose}>
			{menu.map((m, index) => [
				<MenuItem key={index}>
					<ListItemIcon>{m.icon}</ListItemIcon>
					<ListItemText>{m.label}</ListItemText>
					{m.shortcut ? <Typography variant="body2" color="text.secondary">{m.shortcut}</Typography> : null}
				</MenuItem>,
				m.hasDividerBelow ? <Divider key={`div-${index}`} orientation="horizontal" sx={{ my: 1 }} /> : null
			]).flat()}
		</Menu>
	);
}

DropdownMenu.defaultProps = {};

export default DropdownMenu;
