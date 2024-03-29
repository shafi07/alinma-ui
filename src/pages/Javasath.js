import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
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
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import AddBill from '../components/javasath/addJavasath'
import EditBill from '../components/javasath/editBill'
import Toast from '../components/toast';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { Box } from '@mui/system';
import View from 'src/components/view';
import { URL, javasathHeaders, JAVASATH_TABLE_HEAD } from '../_mock/constant'

// ----------------------------------------------------------------------

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

  let scrl = useRef(null);

  const [scrollX, setscrollX] = useState(0);
  
  const [scrolEnd, setscrolEnd] = useState(false);

  const [toast,setToast]=useState(false)

  const [message,setMessage]=useState(null)

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

  const fetchData = async (query,status)=>{
    const url = query || status ? `${URL}/javasath?query=${query}&status=${status}` : `${URL}/javasath`
    setLoading(true)
    axios.get(url)
      .then((res) => {
        if(res.status == 200){
        setUSERLIST(res.data)
        setLoading(false)
        }else{
          setUSERLIST([])
          setLoading(false) 
        }
      }).catch((err) => {
        setUSERLIST([])
        setLoading(false)
      })
  }

  const editOpen = async(data)=>{
    setEditData(data)
    setEditModel(true)
  }

  const editDataOpen = async(data)=>{
    setEditData(data)
    setOpen(true)
  }

  const submitJavazath = async (data,actions) => {
    setLoading(true)
    axios.post(`${URL}/javasath`, data)
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
  }

  const editJavazath = async (data) => {
    setLoading(true)
    axios.put(`${URL}/javasath`, data)
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

  const editJavazathHandler = async (data,actions) => {
    setLoading(true)
    axios.patch(`${URL}/javasath`, data)
      .then((res) => {
        setOpen(false)
        setReFetch(!reFetch)
        actions.resetForm()
        setMessage(res.data.message)
        setEditData(null)
        setToast(true)
      }).catch((err) => {
        setMessage(err.response.data.message)
        setToast(true)
        setLoading(false)
      })
  }

  const handleStatusChange = async (value,id) => {
    setLoading(true)
    axios.put(`${URL}/javasath`, {status:value,id,updatedTime: new Date().toLocaleDateString()})
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

  const handleDelete = async (id) => {
    setLoading(true)
    axios.delete(`${URL}/javasath/${id}`)
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

  const handlePrint = async(data)=>{
    navigate('/print',{state:{path:"javasath",...data}})
  }

  const handleStatusFilter = async(data)=>{
    setLoading(true)
    data == 'All' ? setStatus('') : setStatus(data) 
  }

  const viewOpen = async(data)=>{
    setViewData(data)
    setView(true)
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


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const isUserNotFound = USERLIST.length === 0;

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
          <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
            Export CSV
          </Button>
          </CSVLink>
        </Stack>

        <Card>
          <UserListToolbar slide={slide} handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
          <Scrollbar >
          {loading ? <Box sx={{ width:'100%',display:'flex',minHeight:'50vh',alignItems:'center',justifyContent:'center' }} >
            <CircularProgress color="inherit" />
          </Box>:
            <TableContainer ref={scrl} onScroll={scrollCheck}  >
              <Table style={{width:"125%"}} >
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
                    const {id, id_number, fileid, name, sub_category,  sponser_name, balance_amount, mobilenumber,total_amount, status,re_entry_type} = row;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        align = 'center'
                        sx={{
                          "&:hover": {
                            backgroundColor: balance_amount == 0 ? "#B6E2D3 !important" :"#FAE8E0 !important" 
                          }
                        }}
                        onClick={() => editOpen(row)} 
                      >
                        <TableCell sx={{cursor:"pointer"}} onClick={() => editDataOpen(row)} component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {fileid}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation();navigator.clipboard.writeText(name)} } component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation();navigator.clipboard.writeText(sub_category)} } align="left">{sub_category == 'Re Entry'?`${sub_category}/${re_entry_type}`:sub_category}</TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation();navigator.clipboard.writeText(id_number)} } component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {id_number}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation();navigator.clipboard.writeText(sponser_name)} } align="left">{sponser_name}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(balance_amount != 0 && 'error') || 'success'}>
                            {sentenceCase(balance_amount == 0 ? 'Paid':'Credit')}
                          </Label>
                        </TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation()} }  align="left">
                          <Select onChange={(e)=>handleStatusChange(e.target.value,id)} defaultValue={status} sx={{height: 30,width:'84%' }} >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"completed"}>Completed</MenuItem>
                            <MenuItem value={"returned"}>Returned</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="left">{mobilenumber}</TableCell>
                        <TableCell align="left">{total_amount}</TableCell>
                        <TableCell align="left">{balance_amount}</TableCell>
                        <TableCell align="left" >
                            <Iconify icon="eva:trash-2-outline" width={24} height={24} onClick={(e) =>{e.stopPropagation()
                            handleDelete(row.id)} } /> 
                        </TableCell>
                        <TableCell onClick={(e) =>{e.stopPropagation()} }  align="right">
                          <UserMoreMenu 
                          row={row} 
                          handlePrint={handlePrint} 
                          viewOpen={viewOpen} 
                          editDataOpen={editDataOpen} 
                          />
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
      {toast&&<Toast toast={toast} setToast={setToast} message={message} />}
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
     {editData ? <AddBill
     open = {open} 
     handleClose = {() => {setEditData(null) ;
      setOpen(false)}}
     submitHandler={submitJavazath}
     loading={loading}
     editData={editData}
     editJavazathHandler={editJavazathHandler}
     /> :''}
     {viewData ? <View
    open={view}
    viewData={viewData}
    handleClose = {handleCloseView}
    /> : '' }
    </>
  );
}
