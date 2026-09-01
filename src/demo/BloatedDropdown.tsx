import { useState } from "react";
import type { ReactNode } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

/**
 * DEMO ONLY — a strawman dropdown, the shape it tends to grow into once
 * every team's "small ask" gets bolted onto the one shared component instead
 * of being given a purpose-built home. Not part of the real product.
 *
 * Compare against the real, already-split component this repo ships:
 * @mansi-manhas/components-ui  -> Select
 */

export interface BloatedDropdownItem {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  divider?: boolean;
  destructive?: boolean;
}

export interface BloatedDropdownProps {
  // Team A — the original ask: a plain dropdown
  items: BloatedDropdownItem[];
  value?: string;
  onChange: (value: string) => void;

  // Team B — avatar bolted onto the dropdown
  avatarUrl?: string;

  // Team C — title bolted onto the same dropdown
  title?: string;

  // Team D — needed a richer row than a label
  renderItem?: (item: BloatedDropdownItem) => ReactNode;

  disabled?: boolean;
}

export interface DropdownDiagnostics {
  destructiveColorLost: boolean;
}

function computeDiagnostics(props: BloatedDropdownProps): DropdownDiagnostics {
  // Team D's custom renderer owns the row's markup, including color — it was
  // written with no idea that Team A's "destructive" convention depends on
  // inheriting color from the MenuItem it renders inside.
  const destructiveColorLost = Boolean(props.renderItem) && props.items.some((item) => item.destructive);
  return { destructiveColorLost };
}

export function BloatedDropdown(props: BloatedDropdownProps) {
  const { items, value, onChange, avatarUrl, title, disabled, renderItem } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const diagnostics = computeDiagnostics(props);
  if (diagnostics.destructiveColorLost) {
    // Real component libraries that bother to warn look like this in the console —
    // the ones that don't just fail silently, which is worse.
    // eslint-disable-next-line no-console
    console.warn("[BloatedDropdown]", diagnostics);
  }

  const selectedItem = items.find((item) => item.value === value);
  const showHeader = Boolean(title || avatarUrl);

  return (
    <Box>
      <Button variant="outlined" disabled={disabled} onClick={(e) => setAnchorEl(e.currentTarget)}>
        {selectedItem?.label ?? "Select…"}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {title && (
          <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 700 }}>
            {title}
          </Typography>
        )}
        {avatarUrl && (
          <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
            <Avatar src={avatarUrl} sx={{ width: 28, height: 28 }} />
          </Box>
        )}
        {showHeader && <Divider sx={{ mb: 0.5 }} />}
        {items.map((item) => [
          item.divider && <Divider key={`${item.id}-divider`} />,
          <MenuItem
            key={item.id}
            disabled={item.disabled}
            selected={item.value === value}
            onClick={() => {
              onChange(item.value);
              setAnchorEl(null);
            }}
            sx={item.destructive ? { color: "error.main" } : undefined}
          >
            {renderItem ? renderItem(item) : <ListItemText primary={item.label} />}
          </MenuItem>,
        ])}
      </Menu>
    </Box>
  );
}
