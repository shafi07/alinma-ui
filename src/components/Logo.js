import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  light: PropTypes.bool,
};

export default function Logo({ disabledLink = false, sx, light = false }) {
  const mark = (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={sx}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          display: 'grid',
          placeItems: 'center',
          background: light
            ? 'linear-gradient(145deg, #F8F1DE 0%, #C4A15A 100%)'
            : 'linear-gradient(145deg, #1A8A84 0%, #0A4F4C 100%)',
          color: light ? '#1C1915' : '#fff',
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: '-0.04em',
          flexShrink: 0,
        }}
      >
        A
      </Box>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 16,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: light ? '#F7F5F1' : 'text.primary',
        }}
      >
        Alinma
      </Typography>
    </Stack>
  );

  if (disabledLink) {
    return mark;
  }

  return (
    <RouterLink to="/dashboard/app" style={{ textDecoration: 'none' }}>
      {mark}
    </RouterLink>
  );
}
