import { useState,useEffect, useCallback } from 'react';
// material
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { UserListToolbar } from '../sections/@dashboard/user';
import AddBill from '../components/customer-details/addCustomer'
import EditBill from '../components/javasath/editBill'
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { URL,expenseHeaders } from '../_mock/constant'
import Toast from '../components/toast';
import DeleteCellRenderer from 'src/components/Cell-renders/DeleteCell';
import NewTable from './table';

export default function Customer() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [query,setQuey]= useState('');
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [open,setOpen] = useState(false)
  const[USERLIST,setUSERLIST]=useState([])
  const [editData,setEditData]=useState(null)
  const [editModel,setEditModel]= useState(false)
  const [reFetch,setReFetch]=useState(false)
  const [loading,setLoading]=useState(true)
  const[status,setStatus] = useState('')
  const [toast,setToast]=useState(false)
  const [message,setMessage]=useState(null)

  const [colDef] = useState([
    { headerName: 'File',width: 120, field: 'fileid', sortable: true, filter: true,cellStyle: { fontWeight: 'bold' }  },
    { headerName: 'Name', field: 'name', sortable: true, editable:true, filter: true },
    { headerName: 'ID number', field: 'id_number', sortable: true, editable:true, filter: true },
    { headerName: 'Mobile', field: 'mobilenumber', sortable: true, editable:true, filter: true },
    { 
        headerName: 'Created Time', 
        field: 'createdtime', 
        sortable: true, 
        filter: true,
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return date.toLocaleDateString(); // Format: MM/DD/YYYY based on locale
          }, 
    },
    { 
      field: "actions",
      cellRenderer: (params) => (
        <DeleteCellRenderer
          node={params.node}
          api={params.api}
          onDelete={handleDeleteRow} // Pass the deletion handler
        />
      ), 
      width: 150,
      floatingFilter: false ,
      filter: false  
    },
])

const handleDeleteRow = useCallback((deletedRow) => {
  console.log("Deleted row data:>", deletedRow);
  handleDelete(deletedRow.id)
}, []);

const handleCellClick = (params) => {
  if (params.colDef.field === "fileid") {
    // const clickedFileId = params.value; 
    const clickedRowData = params.data;
    editOpen(clickedRowData)
  }
 
}

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
    const url = query ? `${URL}/customer?query=${query}` : `${URL}/customer`
    const response = await fetch(url);
    const newData = await response.json()
    if(response.status == 200) setUSERLIST(newData)
    else setUSERLIST([])
    setLoading(false)
  };

  const editOpen = async(data)=>{
    setEditData(data)
    setOpen(true)
  }

  // const filteredUsers = USERLIST.length>=0?applySortFilter(USERLIST, getComparator(order, orderBy), filterName):[];

  const submitCustomer = async (data,actions) => {
    setLoading(true)
    axios.post(`${URL}/customer`, data)
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

  const editCustomer = async (data) => {
    console.log('>>???',data)
    setLoading(true)
    axios.put(`${URL}/customer`, data)
      .then((res) => {
        setEditData(null)
        // setEditModel(!editModel)
        setOpen(false)
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
    axios.delete(`${URL}/customer/${id}`)
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

  return (
    <>
    <Page title="Customer Details">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-1}>
          <Typography variant="h4" gutterBottom>
            CUSTOMER-DETAILS
          </Typography>
          <Button variant="contained" sx={{backgroundColor:'#F51720'}} onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            New
          </Button>
          <CSVLink headers={expenseHeaders} data={USERLIST ? USERLIST :[]} filename={'test'}>
          <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
            Export CSV
          </Button>
          </CSVLink>
        </Stack>
        <UserListToolbar expense={false} handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
        <NewTable 
        rowData={USERLIST} 
        colDef={colDef} 
        handleCellClick={handleCellClick} 
        editData = {editCustomer}
        />
      </Container>
      <Toast toast={toast} setToast={setToast} message={message} />
    </Page>
    <AddBill
     open = {open} 
     handleClose = {() => setOpen(false)}
     submitHandler={submitCustomer}
     loading={loading}
     />
    {editData ? <EditBill 
     open={editModel}
     editData={editData}
     handleClose = {handleCloseEdit}
     editHandler={editCustomer}
     loading={loading}
     /> :''} 
     {editData ? <AddBill
        open={open}
        handleClose={() => {
          setEditData(null);
          setOpen(false)
        }}
        submitHandler={submitCustomer}
        loading={loading}
        editData={editData}
        editCustomerHandler={editCustomer}
      /> : ''}
    </>
  );
}
