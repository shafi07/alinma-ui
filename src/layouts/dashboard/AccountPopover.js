import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
import MenuPopover from '../../components/MenuPopover';
import account from '../../_mock/account';

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/dashboard/app',
  },
];

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={(event) => setOpen(event.currentTarget)}
        sx={{ p: 0.25 }}
      >
        <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}>
          {account.displayName?.slice(0, 1)}
        </Avatar>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={() => setOpen(null)}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          width: 220,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 1,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={() => setOpen(null)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ m: 1, color: 'error.main' }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
