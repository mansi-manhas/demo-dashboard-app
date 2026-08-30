import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccountSettings, type NotificationPreferences } from "@mansi-manhas/user-profile-ui";
import { Breadcrumbs } from "@mansi-manhas/navigation-ui";

export function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
  });
  const [saving, setSaving] = useState(false);

  const handleNotificationsChange = async (next: NotificationPreferences) => {
    setNotifications(next);
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSaving(false);
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Settings" }]} />

      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1, mb: 3 }}>
        Account settings
      </Typography>

      <Box sx={{ maxWidth: 640 }}>
        <AccountSettings
          notifications={notifications}
          onNotificationsChange={handleNotificationsChange}
          onChangePassword={() => alert("This is a demo — password change isn't wired up.")}
          onDeleteAccount={() => alert("This is a demo — account deletion isn't wired up.")}
          savingNotifications={saving}
        />
      </Box>
    </Box>
  );
}
