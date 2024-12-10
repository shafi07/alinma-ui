import { useState,useEffect } from 'react';
import { useNavigate} from "react-router-dom";
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
import AddBill from '../components/expense/addExpense'
import EditBill from '../components/javasath/editBill'
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { URL,expenseHeaders } from '../_mock/constant'
import Toast from '../components/toast';
import NewTable from './table';

// ----------------------------------------------------------------------

export default function Agent() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
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
  const navigate = useNavigate();
  const [colDef] = useState([
    { headerName: 'File ID',width: 150, field: 'fileid', sortable: true, filter: true,cellStyle: { fontWeight: 'bold', color: 'blue' }  },
    { headerName: 'Agent', field: 'agent', sortable: true, filter: true },
    { headerName: 'Service', field: 'service', sortable: true,filter: true },
    { headerName: 'Sub Category', field: 'sub_category', sortable: true, filter: true },
    { headerName: 'Agent', field: 'agent_amount', sortable: true, filter: true },
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
    { headerName: 'Paid Date', field: 'paid_date', sortable: true, filter: true },
])


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
    const url = query ? `${URL}/agent?query=${query}` : `${URL}/agent`
    const response = await fetch(url);
    const newData = await response.json()
    setUSERLIST(newData)
    setLoading(false)
  };

  const editOpen = async(data)=>{
    setEditData(data)
    setEditModel(true)
  }

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

  const handleStatusFilter = async(data)=>{
    setStatus(data)
  }

  const handlePrint = async(data)=>{
    navigate('/print',{state:{path:"expense",...data}})
  }

  return (
    <>
    <Page title="Agent">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agent
          </Typography>
          <Button disabled={true} variant="contained" sx={{backgroundColor:'#F51720'}} onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Agent
          </Button>
          <CSVLink headers={expenseHeaders} data={USERLIST ? USERLIST :[]} filename={'test'}>
          <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
            Export CSV
          </Button>
          </CSVLink>
        </Stack>
        <NewTable rowData={USERLIST} colDef={colDef} />
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
