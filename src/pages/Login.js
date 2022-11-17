import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';
import { useState } from 'react';

// ----------------------------------------------------------------------
const URL =`http://alinma-env.eba-8frrdp32.ap-south-1.elasticbeanstalk.com`
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const [loading,setLoading]=useState(false)

  const navigate = useNavigate();

  const loginHandler = async(d)=>{
    setLoading(true)
    axios.post(`${URL}/user/auth`, d)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('auth', res.data.id)
          navigate('/dashboard/app', { replace: true });
        }
      }).catch((err) => {
        setLoading(false)
      })
    setLoading(false)
  }

  return (
    <Page title="Login">
      <RootStyle>     
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" alignItems="center" gutterBottom>
              ALINMA TRAVELS
            </Typography>

            <LoginForm loginHandler={loginHandler} loading={loading} />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
