import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import DashboardNavbar from './DashboardNavbar';
import { APP_BAR_HEIGHT } from './constants';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  backgroundColor: theme.palette.background.default,
}));

const MainStyle = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  paddingTop: APP_BAR_HEIGHT + 28,
  paddingBottom: theme.spacing(6),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <CircularProgress size={28} />
    </Box>
  );
}

export default function DashboardLayout() {
  return (
    <RootStyle>
      <DashboardNavbar />
      <MainStyle>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </MainStyle>
    </RootStyle>
  );
}
