import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Alert, Badge, Card } from "@mansi-manhas/components-ui";
import { Breadcrumbs, Tabs } from "@mansi-manhas/navigation-ui";
import { useAuth } from "../auth/AuthContext";

const STATS = [
  { label: "Total revenue", value: "$48,230", delta: "+12.4%", variant: "success" as const },
  { label: "Active users", value: "2,481", delta: "+3.1%", variant: "success" as const },
  { label: "Open tickets", value: "17", delta: "-5.0%", variant: "info" as const },
  { label: "Churn risk", value: "3 accounts", delta: "+1", variant: "warning" as const },
];

const ACTIVITY = [
  { id: 1, actor: "Priya Shah", action: "closed deal", target: "Acme Corp", time: "12m ago" },
  { id: 2, actor: "Diego Ruiz", action: "opened ticket", target: "#4821", time: "38m ago" },
  { id: 3, actor: "Wren Okafor", action: "invited teammate", target: "jamie@example.com", time: "1h ago" },
  { id: 4, actor: "System", action: "completed backup", target: "nightly-2026-08-30", time: "3h ago" },
];

export function DashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");

  return (
    <Box>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />

      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
        Welcome back, {user.name.split(" ")[0]}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Here's what's happening across your workspace today.
      </Typography>

      <Alert variant="info" title="Scheduled maintenance">
        Search indexing will be briefly unavailable Sunday 2am–3am UTC.
      </Alert>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
          my: 3,
        }}
      >
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {stat.value}
              </Typography>
              <Badge variant={stat.variant}>{stat.delta} this month</Badge>
            </Stack>
          </Card>
        ))}
      </Box>

      <Tabs
        value={tab}
        onChange={setTab}
        aria-label="Dashboard sections"
        items={[
          { label: "Overview", value: "overview" },
          { label: "Reports", value: "reports" },
        ]}
      />

      <Box sx={{ mt: 2 }}>
        {tab === "overview" ? (
          <Card title="Recent activity" subtitle="Latest events across your team">
            <Stack divider={<Divider />} spacing={1.5}>
              {ACTIVITY.map((event) => (
                <Stack
                  key={event.id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 0.5 }}
                >
                  <Typography variant="body2">
                    <strong>{event.actor}</strong> {event.action}{" "}
                    <Typography component="span" color="text.secondary" variant="body2">
                      {event.target}
                    </Typography>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {event.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Card>
        ) : (
          <Card title="Reports" subtitle="Report generation isn't wired up in this demo">
            <Typography variant="body2" color="text.secondary">
              This is a placeholder tab to demonstrate navigation-ui's Tabs component.
            </Typography>
          </Card>
        )}
      </Box>
    </Box>
  );
}
