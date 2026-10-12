import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material';

PageHeader.propTypes = {
  group: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.node,
};

export default function PageHeader({ group, title, description, actions }) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      alignItems={{ md: 'flex-end' }}
      justifyContent="space-between"
      sx={{ mb: 2.5 }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Breadcrumbs
          separator="·"
          sx={{ mb: 0.75, '& .MuiBreadcrumbs-separator': { mx: 0.75, color: 'text.disabled' } }}
        >
          <Link component={RouterLink} to="/dashboard/app" underline="hover" color="text.secondary" variant="body2">
            Alinma
          </Link>
          {group && (
            <Typography variant="body2" color="text.secondary">
              {group}
            </Typography>
          )}
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ letterSpacing: '-0.03em', fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      {actions && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {actions}
        </Stack>
      )}
    </Stack>
  );
}
