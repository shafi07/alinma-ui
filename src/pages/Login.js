import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Toast from 'src/components/toast';
import { URL } from '../_mock/constant';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

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
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" alignItems="center" gutterBottom>
              ALINMA TRAVELS
            </Typography>

            <LoginForm loginHandler={loginHandler} loading={loading} />
          </ContentStyle>
        </Container>
      </RootStyle>
      <Toast toast={toast} setToast={setToast} message={message} />
    </Page>
  );
}
