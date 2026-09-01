import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { Select } from "@mansi-manhas/components-ui";
import { useState } from "react";
import { ActionMenu } from "../demo/ActionMenu";
import { BloatedDropdown, type BloatedDropdownItem } from "../demo/BloatedDropdown";
import { UserSelect } from "../demo/UserSelect";

const ITEMS: BloatedDropdownItem[] = [
  { id: "active", label: "Active", value: "active" },
  { id: "paused", label: "Paused", value: "paused" },
  { id: "archived", label: "Archived", value: "archived", divider: true },
  { id: "delete", label: "Delete", value: "delete", destructive: true },
];

const ASKS = [
  { key: "withAvatar", team: "Team B", label: "avatar" },
  { key: "withTitle", team: "Team C", label: "title" },
  { key: "withRenderItem", team: "Team D", label: "renderItem" },
] as const;

function richRowRenderer(item: BloatedDropdownItem) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {item.label}
      </Typography>
    </Box>
  );
}

/**
 * DEMO ONLY — live prop-toggle playground for the "Scope Creep" slide.
 * Not linked from the sidebar; reach it directly at /demo/scope-creep.
 * Safe to delete this file, BloatedDropdown.tsx, and its route after the talk.
 */
const USERS = [
  { id: "amy", name: "Amy Chen", avatarUrl: "https://i.pravatar.cc/40?img=5" },
  { id: "raj", name: "Raj Patel", avatarUrl: "https://i.pravatar.cc/40?img=12" },
  { id: "lena", name: "Lena Ortiz" },
];

export function ScopeCreepDemoPage() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [withAvatar, setWithAvatar] = useState(false);
  const [withTitle, setWithTitle] = useState(false);
  const [withRenderItem, setWithRenderItem] = useState(false);
  const [assignee, setAssignee] = useState<string | undefined>(undefined);

  const toggles: Record<(typeof ASKS)[number]["key"], [boolean, (v: boolean) => void]> = {
    withAvatar: [withAvatar, setWithAvatar],
    withTitle: [withTitle, setWithTitle],
    withRenderItem: [withRenderItem, setWithRenderItem],
  };

  const active = ASKS.filter((ask) => toggles[ask.key][0]);
  const destructiveColorLost = withRenderItem && ITEMS.some((item) => item.destructive);

  return (
    <Box sx={{ maxWidth: 1100 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Scope Creep: one dropdown, three bolt-on asks
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Team A needed a plain dropdown: items in, onChange out. Every toggle below is a later
        team's "small ask," bolted onto that same shared component instead of getting a
        purpose-built home. Each one looks harmless alone — toggle a few together and watch what
        happens.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Paper variant="outlined" sx={{ p: 2.5, width: { md: 300 }, flexShrink: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Later asks, bolted on
          </Typography>
          <Stack spacing={1.5}>
            {ASKS.map((ask) => {
              const [checked, setChecked] = toggles[ask.key];
              return (
                <FormControlLabel
                  key={ask.key}
                  control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                  label={`${ask.label} (${ask.team})`}
                />
              );
            })}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="caption" color="text.secondary">
            {active.length} of {ASKS.length} asks active — this one component must render
            correctly across all 2<sup>{ASKS.length}</sup> = {2 ** ASKS.length} combinations of
            them, and nobody signed up to test all {2 ** ASKS.length}.
          </Typography>
        </Paper>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Rendered output
            </Typography>
            <BloatedDropdown
              items={ITEMS}
              value={value}
              onChange={setValue}
              avatarUrl={withAvatar ? "https://i.pravatar.cc/40" : undefined}
              title={withTitle ? "Change status" : undefined}
              renderItem={withRenderItem ? richRowRenderer : undefined}
            />
          </Paper>

          {active.length > 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Active asks stacked on this render:
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {active.map((ask) => (
                  <Chip key={ask.key} size="small" label={`${ask.team}: ${ask.label}`} color="info" variant="outlined" />
                ))}
              </Stack>
            </Alert>
          )}

          {destructiveColorLost && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Team D's renderItem doesn't know about Team A's "destructive" convention
              </Typography>
              <Typography variant="body2">
                "Delete" quietly loses its warning color the moment a custom row renderer
                arrives — nobody wrote renderItem against that convention because nobody told
                them it existed.
              </Typography>
            </Alert>
          )}

          {active.length === 0 && (
            <Alert severity="success" sx={{ mb: 2 }}>
              No bolt-ons active — this is the dropdown Team A actually asked for.
            </Alert>
          )}
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        The fix: give each ask its own home
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Team A's plain dropdown got a purpose-built home in <code>components-ui</code>. Teams B,
        C, and D's asks weren't really Select features at all — each one wanted a different
        component, and giving them one turns out to need less code than the escape hatches did.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">
        <Paper variant="outlined" sx={{ p: 2.5, flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary">
            Team C — "title"
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            components-ui {"<Select label />"}
          </Typography>
          <Select
            label="Change status"
            options={[
              { label: "Active", value: "active" },
              { label: "Paused", value: "paused" },
              { label: "Archived", value: "archived" },
            ]}
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            BloatedDropdown's title only appears once the menu is already open — the closed
            trigger never says what it's for. Select's <code>label</code> (inherited free from
            MUI's TextField) sits on the closed field instead, doing the job earlier with a prop
            that already existed.
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2.5, flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary">
            src/demo — new
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            {"<UserSelect />"}
          </Typography>
          <UserSelect
            label="Assignee"
            options={USERS}
            value={assignee}
            onChange={setAssignee}
            placeholder="Unassigned"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            BloatedDropdown's avatarUrl renders one static avatar — nothing to pick, no list.
            That's usually the tell that the real ask waiting behind it is "let someone choose a
            person," not "decorate this status field." Worth confirming with Team B before
            building either, but if so: this is the component, not a Select prop.
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2.5, flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary">
            src/demo — new
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
            {"<ActionMenu />"}
          </Typography>
          <ActionMenu
            label="Row actions"
            items={[
              { id: "edit", label: "Edit", onSelect: () => {} },
              { id: "duplicate", label: "Duplicate", onSelect: () => {} },
              {
                id: "delete",
                label: "Delete",
                description: "This can't be undone",
                destructive: true,
                divider: true,
                onSelect: () => {},
              },
            ]}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            renderItem was really two asks at once: richer status rows, and a way to trigger
            delete. The first would mean giving Select's own options real slots (icon,
            description) — a components-ui change, not shown here. The second was never a value
            to select. ActionMenu covers that half: <code>destructive</code> is a field it
            renders itself, so there's no render prop left to silently drop it.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
