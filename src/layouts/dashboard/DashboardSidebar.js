import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import navConfig from './NavConfig';
const DRAWER_WIDTH = 268;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2 }}>
        <Logo light />
      </Box>

      <Typography
        variant="overline"
        sx={{ px: 3, pt: 1, pb: 0.5, color: 'rgba(247,245,241,0.38)', letterSpacing: '0.16em' }}
      >
        Menu
      </Typography>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mx: 2, mb: 2.5, p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)' }}>
        <Typography variant="subtitle2" sx={{ color: '#F7F5F1' }}>
          Al Kharj office
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(247,245,241,0.55)' }}>
          Near Gold Market, Sulaimaniya
        </Typography>
      </Box>
    </Scrollbar>
  );

  const paperSx = {
    width: DRAWER_WIDTH,
    bgcolor: '#0E1218',
    color: '#F7F5F1',
    borderRight: 'none',
  };

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: paperSx }}>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer open variant="persistent" PaperProps={{ sx: paperSx }}>
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
