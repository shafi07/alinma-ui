import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect,useRef } from 'react';
import { useNavigate} from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import AddBill from '../components/javasath/addJavasath'
import EditBill from '../components/javasath/editBill'
import Print from './print'
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { Box } from '@mui/system';
import View from 'src/components/view';
import { URL,javasathHeaders,JAVASATH_TABLE_HEAD } from '../_mock/constant'

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => ((_user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)|(_user.sponser_name.toLowerCase().indexOf(query.toLowerCase()) !== -1)));
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [query,setQuey]= useState('');

  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [open,setOpen] = useState(false)

  const[USERLIST,setUSERLIST]=useState([])

  const [editData,setEditData]=useState(null)

  const [editModel,setEditModel]= useState(false)

  const [reFetch,setReFetch]=useState(false)

  const [loading,setLoading]=useState(true)

  const[status,setStatus] = useState('')

  const[view,setView]=useState(false)

  const[viewData,setViewData]=useState(null)

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    fetchData(query,status);
  },[query,reFetch,status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setQuey(event.target.value);
  };

  const handleCloseEdit = ()=>{
    setEditData(null)
    setEditModel(!editModel)
  }

  const handleCloseView = ()=>{
    setViewData(null)
    setView(!view)
  }

  const fetchData = async (query,status) => {
    const url = query || status ? `${URL}/javasath?query=${query}&status=${status}` : `${URL}/javasath`
    const response = await fetch(url);
    const newData = await response.json()
    console.log('<<<<',newData)
    setUSERLIST(newData)
    setLoading(false)
  };

  const editOpen = async(data)=>{
    setEditData(data)
    setEditModel(true)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = USERLIST.length >= 0 ? applySortFilter(USERLIST, getComparator(order, orderBy), filterName) : [];

  const isUserNotFound = filteredUsers.length === 0;

  const submitJavazath = async (data,actions) => {
    console.log('kkkkkkk', data)
    setLoading(true)
    axios.post(`${URL}/javasath`, data)
      .then((res) => {
        console.log('----->', res)
        setOpen(false)
        setReFetch(!reFetch)
        actions.resetForm()
      }).catch((err) => {
        setLoading(false)
      })
  }

  const editJavazath = async (data) => {
    setLoading(true)
    axios.put(`${URL}/javasath`, data)
      .then((res) => {
        console.log('----->', res)
        setEditData(null)
        setEditModel(!editModel)
        setReFetch(!reFetch)
      }).catch((err) => {
        setLoading(false)
      })
  }

  const handleStatusChange = async (value,id) => {
    setLoading(true)
    axios.put(`${URL}/javasath`, {status:value,id})
      .then((res) => {
        console.log('----->', res)
        setEditModel(!editModel)
        setReFetch(!reFetch)
      }).catch((err) => {
        setLoading(false)
      })
  }

  const handlePrint = async(data)=>{
    navigate('/print',{state:{path:"javasath",...data}})
  }

  const handleStatusFilter = async(data)=>{
    setLoading(true)
    data == 'All' ? setStatus('') : setStatus(data) 
  }

  const handleDelete = async(data)=>{
    setStatus(data)
  }

  const viewOpen = async(data)=>{
    setViewData(data)
    setView(true)
  }

  return (
    <>
    <Page title="Javasath">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            JAVASATH
          </Typography>
          <Button variant="contained" sx={{backgroundColor:'#F51720'}} onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            New Javasath
          </Button>
          <CSVLink headers={javasathHeaders} data={USERLIST?USERLIST:[]} filename={'test'}>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Export CSV
          </Button>
          </CSVLink>
        </Stack>

        <Card>
          <UserListToolbar handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
          <Scrollbar>
          {loading ? <Box sx={{ width:'100%',display:'flex',minHeight:'50vh',alignItems:'center',justifyContent:'center' }} >
            <CircularProgress color="inherit" />
          </Box>:
            <TableContainer>
              <Table style={{width:"200%"}} >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={JAVASATH_TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {id,id_number, fileid='JZ1', name, sub_category='dss', insurance,service,sponser_name='test',
                    paid_amount='test',balance_amount='test',iqama='test',mol='test',mobilenumber='989898989898',
                    other='test',total_amount,status="pending" } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        align = 'center'
                        sx = {{backgroundColor: balance_amount != 0?'#F7837C':'#73D393'}}
                        onClick={() => editOpen(row)} 
                      >
                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {fileid}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {id_number}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{sub_category}</TableCell>
                        <TableCell align="left">{sponser_name}</TableCell>
                        <TableCell align="left">{mobilenumber}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(balance_amount != 0 && 'error') || 'success'}>
                            {sentenceCase(balance_amount == 0 ? 'Paid':'Credit')}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{mol}</TableCell>
                        <TableCell align="left">{iqama}</TableCell>
                        <TableCell align="left">{insurance}</TableCell>
                        <TableCell align="left">{service}</TableCell>
                        <TableCell align="left">{other}</TableCell>
                        <TableCell align="left">{total_amount}</TableCell>
                        <TableCell align="left">{paid_amount}</TableCell>
                        <TableCell align="left">{balance_amount}</TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation()} }  align="left">
                          <Select onChange={(e)=>handleStatusChange(e.target.value,id)} defaultValue={status} sx={{height: 30,width:'84%' }} >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"completed"}>Completed</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="left" >
                          < PrintIcon onClick={(e) =>{e.stopPropagation()
                            handlePrint(row)} } />
                        </TableCell>
                        <TableCell align="left" >
                          <Iconify icon="mdi:eye-outline" width={24} height={24} onClick={(e) => {
                            e.stopPropagation()
                            viewOpen(row)
                          }} />
                        </TableCell>
                        {/* <TableCell align="left" >
                          <Iconify icon="mdi:eye-outline" width={24} height={24} onClick={(e) => {
                            e.stopPropagation()
                            viewOpen(row)
                          }} />
                        </TableCell> */}
                        <TableCell onClick={(e) =>{e.stopPropagation()} }  align="right">
                          <UserMoreMenu row={row} handlePrint={handlePrint} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={query} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[100]} 
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
          />
        </Card>
      </Container>
    </Page>
    <AddBill
     open = {open} 
     handleClose = {() => setOpen(false)}
     submitHandler={submitJavazath}
     loading={loading}
     />
    {editData ? <EditBill 
     open={editModel}
     editData={editData}
     handleClose = {handleCloseEdit}
     editHandler={editJavazath}
     loading={loading}
     /> :''} 
     {viewData ? <View
    open={view}
    viewData={viewData}
    handleClose = {handleCloseView}
    /> : '' }
    </>
  );
}
