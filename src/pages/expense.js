import { filter } from 'lodash';
import { useState,useEffect, useRef } from 'react';
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
  Box,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import AddBill from '../components/expense/addExpense'
import EditBill from '../components/javasath/editBill'
import { CSVLink } from 'react-csv';
import axios from 'axios';
import moment from 'moment';
import { URL,expenseHeaders, EXPENSE_TABLE_HEAD } from '../_mock/constant'
import Toast from '../components/toast';

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

export default function Expense() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [query,setQuey]= useState('');

  const [rowsPerPage, setRowsPerPage] = useState(100);

  const [open,setOpen] = useState(false)

  const[USERLIST,setUSERLIST]=useState([])

  const [editData,setEditData]=useState(null)

  const [editModel,setEditModel]= useState(false)

  const [reFetch,setReFetch]=useState(false)

  const [loading,setLoading]=useState(true)

  const[status,setStatus] = useState('')

  let scrl = useRef(null);

  const [scrollX, setscrollX] = useState(0);

  const [scrolEnd, setscrolEnd] = useState(false);

  const [toast,setToast]=useState(false)

  const [message,setMessage]=useState(null)

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
    fetchData(query);
  },[query,reFetch]);

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

  const fetchData = async (query,status) => {
    const url = query ? `${URL}/expense?query=${query}` : `${URL}/expense`
    const response = await fetch(url);
    const newData = await response.json()
    setUSERLIST(newData)
    setLoading(false)
  };

  const editOpen = async(data)=>{
    setEditData(data)
    setEditModel(true)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = USERLIST.length>=0?applySortFilter(USERLIST, getComparator(order, orderBy), filterName):[];

  const isUserNotFound = filteredUsers.length === 0;

  const submitExpense = async (data,actions) => {
    setLoading(true)
    axios.post(`${URL}/expense`, data)
      .then((res) => {
        setOpen(false)
        setReFetch(!reFetch)
        actions.resetForm()
        setMessage(res.data.message)
        setToast(true)
      }).catch((err) => {
        setMessage(err.response.data.message)
        setToast(true)
        setLoading(false)
      })
      actions.resetForm()
  }

  const editExpense = async (data) => {
    setLoading(true)
    axios.put(`${URL}/expense`, data)
      .then((res) => {
        setEditData(null)
        setEditModel(!editModel)
        setReFetch(!reFetch)
        setMessage(res.data.message)
        setToast(true)
      }).catch((err) => {
        setMessage(err.response.data.message)
        setToast(true)
        setLoading(false)
      })
  }

  const handleDelete = async (id) => {
    setLoading(true)
    axios.delete(`${URL}/expense/${id}`)
      .then((res) => {
        setEditModel(!editModel)
        setReFetch(!reFetch)
        setMessage(res.data.message)
        setToast(true)
      }).catch((err) => {
        setMessage(err.response.data.message)
        setToast(true)
        setLoading(false)
      })
  }

  const handleStatusFilter = async(data)=>{
    setStatus(data)
  }

  const handlePrint = async(data)=>{
    navigate('/print',{state:{path:"expense",...data}})
  }

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <>
    <Page title="Expense">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            EXPENSE
          </Typography>
          <Button variant="contained" sx={{backgroundColor:'#F51720'}} onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Expense
          </Button>
          <CSVLink headers={expenseHeaders} data={USERLIST ? USERLIST :[]} filename={'test'}>
          <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
            Export CSV
          </Button>
          </CSVLink>
        </Stack>

        <Card>
          <UserListToolbar slide={slide} expense={false} handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
          <Scrollbar>
          {loading ? <Box sx={{ width:'100%',display:'flex',minHeight:'50vh',alignItems:'center',justifyContent:'center' }} >
            <CircularProgress color="inherit" />
          </Box>:
            <TableContainer ref={scrl} onScroll={scrollCheck}  >
              <Table style={{width:"150%"}} >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={EXPENSE_TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id,fileid,total_amount,electricity,telephone,salary,stationary,other,remarks,createdtime  } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        align = 'center'
                        // sx = {{backgroundColor: balance_amount != 0?'#F7837C':'#73D393'}}
                        // onClick={() => editOpen(row)} 
                      >
                        <TableCell sx={{cursor:"pointer"}} component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" color={'blue'} noWrap>
                              {fileid}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{electricity}</TableCell>
                        <TableCell align="left">{telephone}</TableCell>
                        <TableCell align="left">{salary}</TableCell>
                        <TableCell align="left">{stationary}</TableCell>
                        <TableCell align="left">{other}</TableCell>
                        <TableCell align="left">{total_amount}</TableCell>
                        <TableCell align="left">{remarks}</TableCell>
                        <TableCell align="left">{moment(createdtime).format("DD-MM-YYYY")}</TableCell>
                        {/* <TableCell align="left">
                          < PrintIcon onClick={(e) =>{e.stopPropagation()
                        handlePrint(row)} } />
                        </TableCell> */}
                        <TableCell align="left">
                        <Iconify icon="eva:trash-2-outline" width={24} height={24} onClick={(e) =>{e.stopPropagation()
                            handleDelete(row.id)} } /> 
                        </TableCell>
                        {/* <TableCell onClick={(e) =>{e.stopPropagation()} }  align="right">
                          <UserMoreMenu />
                        </TableCell> */}
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
                        <SearchNotFound searchQuery={filterName} />
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
          />
        </Card>
      </Container>
      <Toast toast={toast} setToast={setToast} message={message} />
    </Page>
    <AddBill
     open = {open} 
     handleClose = {() => setOpen(false)}
     submitHandler={submitExpense}
     loading={loading}
     />
    {editData ? <EditBill 
     open={editModel}
     editData={editData}
     handleClose = {handleCloseEdit}
     editHandler={editExpense}
     loading={loading}
     /> :''} 
    </>
  );
}
