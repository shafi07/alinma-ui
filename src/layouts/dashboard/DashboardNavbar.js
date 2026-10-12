import { useContext, useState } from 'react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Box, Button, Collapse, IconButton, Stack, Toolbar } from '@mui/material';
import Iconify from '../../components/Iconify';
import Logo from '../../components/Logo';
import useResponsive from '../../hooks/useResponsive';
import { ColorModeContext } from '../../theme';
import AccountPopover from './AccountPopover';
import navConfig from './NavConfig';
import { APP_BAR_HEIGHT } from './constants';

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundImage: 'none',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ToolbarStyle = styled(Toolbar)({
  minHeight: APP_BAR_HEIGHT,
  height: APP_BAR_HEIGHT,
  paddingLeft: 16,
  paddingRight: 12,
  gap: 4,
});

function isActive(path, pathname) {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}

const linkSx = (active) => (theme) => ({
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  fontWeight: active ? 700 : 600,
  fontSize: 15,
  lineHeight: 1.2,
  px: 1.25,
  py: 0.9,
  minWidth: 0,
  flexShrink: 0,
  borderRadius: '8px',
  textTransform: 'none',
  bgcolor: active ? theme.palette.primary.main : 'transparent',
  boxShadow: active ? `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}` : 'none',
  '& .MuiButton-startIcon': { marginLeft: 0, marginRight: '4px' },
  '&:hover': {
    bgcolor: active ? theme.palette.primary.dark : theme.palette.action.hover,
  },
});

export default function DashboardNavbar() {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo />
        </Box>

        {isDesktop && (
          <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {navConfig.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={linkSx(isActive(item.path, pathname))}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        {!isDesktop && <Box sx={{ flexGrow: 1 }} />}

        <IconButton
          onClick={toggleColorMode}
          aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          sx={{ color: 'text.secondary', flexShrink: 0, bgcolor: 'background.paper' }}
        >
          <Iconify icon={mode === 'dark' ? 'eva:sun-fill' : 'eva:moon-fill'} width={20} height={20} />
        </IconButton>

        <AccountPopover />

        {!isDesktop && (
          <IconButton onClick={() => setMenuOpen((open) => !open)} sx={{ color: 'text.primary' }}>
            <Iconify icon={menuOpen ? 'eva:close-fill' : 'eva:menu-2-fill'} />
          </IconButton>
        )}
      </ToolbarStyle>

      {!isDesktop && (
        <Collapse in={menuOpen}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0.5,
              px: 1.5,
              pb: 1.5,
              pt: 0.5,
              bgcolor: 'background.paper',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            {navConfig.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                onClick={() => setMenuOpen(false)}
                sx={(theme) => ({
                  ...linkSx(isActive(item.path, pathname))(theme),
                  justifyContent: 'flex-start',
                })}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Collapse>
      )}
    </RootStyle>
  );
}
