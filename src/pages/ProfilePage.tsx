import { useState } from "react";
import Box from "@mui/material/Box";
import {
  ProfileForm,
  ProfileHeader,
  UserDetails,
  UserProfileCard,
  type ProfileFormData,
} from "@mansi-manhas/user-profile-ui";
import { Breadcrumbs } from "@mansi-manhas/navigation-ui";
import { useAuth } from "../auth/AuthContext";

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = async (data: ProfileFormData) => {
    setSaving(true);
    try {
      // Demo only: no backend, so just persist to local auth state.
      await new Promise((resolve) => setTimeout(resolve, 400));
      updateUser({ name: data.name, email: data.email, phone: data.phone });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profile" }]} />

      <Box sx={{ mt: 1, mb: 3 }}>
        <ProfileHeader
          user={{ name: user.name, title: user.title, bio: user.bio, avatarUrl: user.avatarUrl }}
          status="online"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <UserProfileCard
            user={{ name: user.name, email: user.email, phone: user.phone, title: user.title, avatarUrl: user.avatarUrl }}
            status="online"
          />
          <UserDetails user={{ name: user.name, email: user.email, phone: user.phone, title: user.title }} />
        </Box>

        <ProfileForm
          user={{ name: user.name, email: user.email, phone: user.phone ?? "", avatarUrl: user.avatarUrl }}
          onSave={handleSave}
          loading={saving}
        />
      </Box>
    </Box>
  );
}
