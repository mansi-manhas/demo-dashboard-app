import { useState } from "react";
import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

/**
 * DEMO ONLY — the purpose-built home for Team D's ask (and the "delete"
 * item that was always mismatched inside BloatedDropdown/Select in the
 * first place).
 *
 * BloatedDropdown is a form value-picker wearing an action-menu's clothes:
 * "Delete" was never a value to select, it's an action to trigger, and the
 * only way to make it look right (via renderItem) was an escape hatch that
 * could silently drop the "destructive" convention. ActionMenu instead
 * makes icon/description/destructive first-class fields the component
 * itself renders — there's no render prop that can forget about them.
 *
 * Compare against @mansi-manhas/components-ui -> Select, which is the
 * right tool when the ask really is "pick a value," not "trigger an
 * action."
 */

export interface ActionMenuItem {
  id: string;
  label: string;
  /** Secondary line rendered under the label. */
  description?: string;
  /** Leading icon slot — a real slot, not a caller-owned render function. */
  icon?: ReactNode;
  /** Styled consistently by ActionMenu itself; can't be dropped by a custom renderer. */
  destructive?: boolean;
  disabled?: boolean;
  /** Divider rendered above this item. */
  divider?: boolean;
  onSelect: () => void;
}

export interface ActionMenuProps {
  label: string;
  items: ActionMenuItem[];
  disabled?: boolean;
}

export function ActionMenu({ label, items, disabled }: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box>
      <Button variant="outlined" disabled={disabled} onClick={(e) => setAnchorEl(e.currentTarget)}>
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {items.map((item) => [
          item.divider && <Divider key={`${item.id}-divider`} />,
          <MenuItem
            key={item.id}
            disabled={item.disabled}
            onClick={() => {
              item.onSelect();
              setAnchorEl(null);
            }}
            sx={item.destructive ? { color: "error.main" } : undefined}
          >
            {item.icon && <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>}
            <ListItemText
              primary={item.label}
              secondary={
                item.description && (
                  <Typography variant="caption" sx={{ color: "inherit", opacity: 0.7 }}>
                    {item.description}
                  </Typography>
                )
              }
            />
          </MenuItem>,
        ])}
      </Menu>
    </Box>
  );
}
