import PropTypes from 'prop-types';
import { Box, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import Iconify from '../../../components/Iconify';

const fieldSx = (theme) => ({
  height: 36,
  borderRadius: '8px',
  bgcolor: theme.palette.background.default,
  color: theme.palette.text.primary,
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
});

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  handleStatusFilter: PropTypes.func,
  expense: PropTypes.bool,
  status: PropTypes.string,
};

export default function UserListToolbar({
  handleStatusFilter,
  expense = true,
  numSelected,
  filterName,
  onFilterName,
  status,
}) {
  if (numSelected > 0) {
    return (
      <Box sx={{ px: 2, py: 1.25 }}>
        <Typography variant="subtitle2" color="primary.main">
          {numSelected} selected
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        flexWrap: 'wrap',
        px: 1.5,
        py: 1.25,
      }}
    >
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder={expense ? 'Search file or name' : 'Search date'}
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 18, height: 18 }} />
          </InputAdornment>
        }
        sx={(theme) => ({ ...fieldSx(theme), flex: '1 1 220px', maxWidth: { sm: 320 } })}
      />

      {expense && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { md: 'auto' } }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.04em' }}>
            STATUS
          </Typography>
          <Select
            value={status || 'All'}
            onChange={(event) => handleStatusFilter(event.target.value)}
            name="status"
            sx={(theme) => ({
              ...fieldSx(theme),
              minWidth: 150,
              '& .MuiSelect-select': { py: 0, display: 'flex', alignItems: 'center' },
            })}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="returned">Returned</MenuItem>
            <MenuItem value="collected">Collected</MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  );
}
