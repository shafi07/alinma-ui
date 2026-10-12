import { useContext, useState } from 'react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Box, Button, Collapse, IconButton, MenuItem, Stack, Toolbar } from '@mui/material';
import Iconify from '../../components/Iconify';
import Logo from '../../components/Logo';
import MenuPopover from '../../components/MenuPopover';
import useResponsive from '../../hooks/useResponsive';
import { ColorModeContext } from '../../theme';
import AccountPopover from './AccountPopover';
import navConfig from './NavConfig';
import { APP_BAR_HEIGHT } from './constants';

const morePaths = ['/dashboard/customer', '/dashboard/expense', '/dashboard/bulkAdd'];
const primaryNav = navConfig.filter((item) => !morePaths.includes(item.path));
const moreNav = navConfig.filter((item) => morePaths.includes(item.path));

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundImage: 'none',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_HEIGHT,
  height: APP_BAR_HEIGHT,
  paddingLeft: 16,
  paddingRight: 12,
  gap: 8,
  [theme.breakpoints.up('xl')]: {
    paddingLeft: 28,
    paddingRight: 20,
    gap: 12,
  },
  [theme.breakpoints.up('xxl')]: {
    paddingLeft: 36,
    paddingRight: 28,
  },
}));

function isActive(path, pathname) {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}

const linkSx = (active) => (theme) => ({
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  fontWeight: active ? 700 : 600,
  fontSize: 14,
  [theme.breakpoints.up('xl')]: { fontSize: 16, px: 1.75 },
  lineHeight: 1.2,
  px: 1.25,
  py: 0.7,
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
  const [moreOpen, setMoreOpen] = useState(null);
  const moreActive = moreNav.some((item) => isActive(item.path, pathname));

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
              spacing={{ lg: 1.25, xl: 2.25, xxl: 3 }}
              sx={{
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {primaryNav.map((item) => (
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
              <Button
                onClick={(event) => setMoreOpen(event.currentTarget)}
                endIcon={<Iconify icon="eva:chevron-down-fill" width={16} height={16} />}
                sx={linkSx(moreActive)}
              >
                More
              </Button>
              <MenuPopover
                open={Boolean(moreOpen)}
                anchorEl={moreOpen}
                onClose={() => setMoreOpen(null)}
                sx={{ width: 180, p: 0.5 }}
              >
                {moreNav.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setMoreOpen(null)}
                    sx={{
                      borderRadius: 1,
                      fontWeight: isActive(item.path, pathname) ? 700 : 600,
                      color: isActive(item.path, pathname) ? 'primary.main' : 'text.primary',
                      gap: 1,
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </MenuItem>
                ))}
              </MenuPopover>
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
