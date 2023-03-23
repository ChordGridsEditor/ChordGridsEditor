import React, { ReactNode, useState } from "react";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";

export interface MenuElementBase {
	label: string;
	icon: any;
	hasDividerBelow?: boolean;
}

export interface MenuAction extends MenuElementBase {
	action: () => void;
	shortcut?: string;
}

export interface MenuWithSubMenus extends MenuElementBase {
	children: MenuElement[];
}

export type MenuElement = MenuAction | MenuWithSubMenus;

export function isAction(m: MenuElement): m is MenuAction {
	return "action" in m;
}


export interface DropdownItemRightInfoProps {
	children?: ReactNode;
}

export function DropdownItemRightInfo({ children }: DropdownItemRightInfoProps) {
	if (!children)
		return null;

	return (
		<Typography variant="body2" color="text.secondary">{children}</Typography>
	)
}

export interface DropdownActionItemProps {
	item: MenuAction;
	labelShouldHaveMarginRight: boolean;
}

const MARGIN_RIGHT_INFO = 5;

export function DropdownActionItem({ item: { label, shortcut, icon, action }, labelShouldHaveMarginRight }: DropdownActionItemProps) {
	return (
		<MenuItem onClick={action}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText sx={{ mr: labelShouldHaveMarginRight ? MARGIN_RIGHT_INFO : 0 }}>{label}</ListItemText>
			<DropdownItemRightInfo>{shortcut}</DropdownItemRightInfo>
		</MenuItem>
	);
}

export interface DropdownWithSubMenusItemProps {
	item: MenuWithSubMenus;
}

export function DropdownWithSubMenusItem({ item: { label, icon, children } }: DropdownWithSubMenusItemProps) {
	const [ subMenuAnchor, setSubMenuAnchor ] = useState<HTMLElement>();

	return (
		<>
			<MenuItem onClick={e => setSubMenuAnchor(e.currentTarget)}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText sx={{ mr: MARGIN_RIGHT_INFO }}>{label}</ListItemText>
				<DropdownItemRightInfo>►</DropdownItemRightInfo>
			</MenuItem>

			<DropdownMenu
				menu={children}
				onClose={() => setSubMenuAnchor(undefined)}
				anchor={subMenuAnchor}
				menuOnTheSide
			/>
		</>
	);
}

export interface DropdownMenuProps {
	anchor?: HTMLElement;
	onClose: () => void;
	menu: MenuElement[];
	menuOnTheSide?: boolean;
}

export function DropdownMenu({ anchor, onClose, menu, menuOnTheSide }: DropdownMenuProps) {
	const hasAtLeastOneRightInfo = menu.some(m => !isAction(m) || m.shortcut);

	if (!menu.length)
		return null;

	return (
		<Menu
			open={!!anchor}
			anchorEl={anchor}
			onClose={onClose}
			anchorOrigin={menuOnTheSide ? { horizontal: "right", vertical: "top" } : { horizontal: "left", vertical: "bottom" } }
			transformOrigin={menuOnTheSide ? { vertical: 8, horizontal: 0 } : undefined}
		>
			{menu.map((m, index) => [
				isAction(m) ? (
					<DropdownActionItem key={index} item={m} labelShouldHaveMarginRight={hasAtLeastOneRightInfo} />
				) : (
					<DropdownWithSubMenusItem key={index} item={m} />
				),

				m.hasDividerBelow && index !== menu.length - 1 ? (
					<Divider key={`div-${index}`} orientation="horizontal" sx={{ my: 1 }}/>
				) : null,
			]).flat()}
		</Menu>
	);
}

DropdownMenu.defaultProps = {};

export default DropdownMenu;
