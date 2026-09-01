import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mansi-manhas/components-ui";

/**
 * DEMO ONLY — the purpose-built home for Team B's ask.
 *
 * "Add an avatar to the dropdown" wasn't really a Select ask — it was a
 * "let people pick a person, not a string" ask. Bolting an avatarUrl prop
 * onto a generic value-picker meant every other consumer of that dropdown
 * paid for a prop they'd never use. UserSelect keeps that need in its own
 * component, and composes the library's own Avatar rather than
 * reinventing initials/sizing.
 */

export interface UserOption {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface UserSelectProps {
  label?: string;
  options: UserOption[];
  value?: string;
  onChange: (id: string) => void;
  placeholder?: string;
}

export function UserSelect({ label, options, value, onChange, placeholder = "Select…" }: UserSelectProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selected = options.find((option) => option.id === value);

  return (
    <Box>
      {label && (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
          {label}
        </Typography>
      )}
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={selected ? <Avatar size="sm" name={selected.name} src={selected.avatarUrl} /> : undefined}
        sx={{ textTransform: "none", justifyContent: "flex-start" }}
      >
        {selected?.name ?? placeholder}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === value}
            onClick={() => {
              onChange(option.id);
              setAnchorEl(null);
            }}
            sx={{ gap: 1.5 }}
          >
            <Avatar size="sm" name={option.name} src={option.avatarUrl} />
            <Typography variant="body2">{option.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
