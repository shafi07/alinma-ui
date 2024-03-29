import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar,Button, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Select, MenuItem, InputLabel } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import Filter from './Filter';

// ----------------------------------------------------------------------

const subCategories = [
  {value:1,label:'rty'},{value:2,label:'qwq'}
]

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({handleStatusFilter, expense=true, slide, numSelected, filterName, onFilterName,status }) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (<>
        {/* <Button onClick={() => slide(-200)} >{'<'}</Button> */}
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={expense?"Search File or Name...":"Search Date..."}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
        <Button onClick={() => slide(-200)} >{'<'}</Button>
        <Button onClick={() => slide(+200)} >{'>'}</Button>
        { expense &&  <Select
           onChange={(e) => handleStatusFilter(e.target.value)} 
          defaultValue={status == ''? 'All':status}
           name='status'
           sx={{width: 240,width: '200px',height: 55 }} >
            <MenuItem value={'All'}>All</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
            <MenuItem value={"credit"}>Credit</MenuItem>
            <MenuItem value={"returned"}>Returned</MenuItem>
            <MenuItem value={"collected"}>Collected</MenuItem>
          </Select>}
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          {/* <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton> */}
          <Filter/>
        </Tooltip>
        // <Button onClick={() => slide(+200)} >{'>'}</Button>
      )}
    </RootStyle>
  );
}
