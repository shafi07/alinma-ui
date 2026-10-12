import PropTypes from 'prop-types';
import { Box, Card, Typography } from '@mui/material';
import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from '../../../components/Iconify';

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: 'none',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          color: (theme) => theme.palette[color].dark,
          bgcolor: (theme) => theme.palette[color].lighter,
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </Box>
      <Box>
        <Typography variant="h4" sx={{ letterSpacing: '-0.03em' }}>
          {fShortenNumber(total)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
