import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import Iconify from './Iconify';

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 42,
  position: 'relative',
  textTransform: 'none',
  color: 'rgba(247, 245, 241, 0.72)',
  borderRadius: 10,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.25),
  marginBottom: 2,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.06)',
    color: '#F7F5F1',
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  minWidth: 28,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const { title, path, icon, info, children } = item;
  const childActive = children?.some((child) => active(child.path));
  const isActiveRoot = active(item.path) || Boolean(childActive);
  const [open, setOpen] = useState(isActiveRoot);

  useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  const activeRootStyle = {
    color: '#F7F5F1',
    fontWeight: 700,
    bgcolor: alpha('#C4A15A', 0.18),
  };

  if (children) {
    return (
      <>
        <ListItemStyle onClick={() => setOpen((prev) => !prev)} sx={{ ...(isActiveRoot && activeRootStyle) }}>
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1, opacity: 0.7 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1.5, mb: 0.5 }}>
            {children.map((child) => {
              const isActiveSub = active(child.path);
              return (
                <ListItemStyle
                  key={child.title}
                  component={RouterLink}
                  to={child.path}
                  sx={{
                    height: 36,
                    ...(isActiveSub && {
                      color: '#F7F5F1',
                      fontWeight: 700,
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: isActiveSub ? '#C4A15A' : 'rgba(247,245,241,0.35)',
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={child.title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle component={RouterLink} to={path} sx={{ ...(isActiveRoot && activeRootStyle) }}>
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ px: 1.5, py: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
