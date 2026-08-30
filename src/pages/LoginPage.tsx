import { useState } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mansi-manhas/components-ui";
import { LoginForm, type LoginFormData, type SocialProvider } from "@mansi-manhas/auth-ui";
import { useAuth } from "../auth/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

  const handleSubmit = async (data: LoginFormData) => {
    setErrorMessage(undefined);
    setLoading(true);
    try {
      await login(data.email);
      navigate(from, { replace: true });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      await login(`demo+${provider}@example.com`);
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Northwind
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your dashboard
          </Typography>
        </Box>
        <Card>
          <LoginForm
            onSubmit={handleSubmit}
            onSocialLogin={handleSocialLogin}
            socialProviders={[{ provider: "google" }, { provider: "github" }]}
            loading={loading}
            errorMessage={errorMessage}
          />
        </Card>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 2 }}>
          Demo build — any email and password will sign you in.
        </Typography>
      </Box>
    </Box>
  );
}
