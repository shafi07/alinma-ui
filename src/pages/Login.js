import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../components/Page';
import Toast from 'src/components/toast';
import { URL } from '../_mock/constant';
import { LoginForm } from '../sections/auth/login';
import Logo from '../components/Logo';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async (d) => {
    setLoading(true);
    axios
      .post(`${URL}/user/auth`, d)
      .then((res) => {
        localStorage.setItem('auth', res.data.id);
        navigate('/dashboard/app', { replace: true });
        setToast(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setToast(true);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <Page title="Login">
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ minHeight: '100vh' }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1.1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 6,
            p: 5,
            color: '#F7F5F1',
            background:
              'radial-gradient(circle at 20% 20%, rgba(196,161,90,0.35), transparent 32%), linear-gradient(160deg, #0E1218 0%, #123E3C 55%, #0F6E6A 100%)',
          }}
        >
          <Logo light disabledLink />
          <Box>
            <Typography sx={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Alinma
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(247,245,241,0.72)', lineHeight: 1.7 }}>
              Near Gold Market (Sulaimaniya)
              <br />
              Al Kharj
              <br />
              Riyadh, Saudi Arabia
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
            py: 6,
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 420 }}>
            <Box sx={{ display: { md: 'none' }, mb: 4 }}>
              <Logo disabledLink />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.03em', mb: 4 }}>
              Sign in
            </Typography>
            <LoginForm loginHandler={loginHandler} loading={loading} />
          </Box>
        </Box>
      </Stack>
      <Toast toast={toast} setToast={setToast} message={message} />
    </Page>
  );
}
