import { useState,useEffect, useRef, useCallback } from 'react';
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
import DeleteCellRenderer from '../components/Cell-renders/DeleteCell';
import { UserListToolbar } from 'src/sections/@dashboard/user';
// import CustomAutoCompleteEditor from './test';

export default function Expense() {
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
  // const handleValueChange = (data) => {
  //   console.log('>>>???',data)
  // }
  const [colDef] = useState([
    { headerName: 'File ID',width: 120, field: 'fileid', sortable: true, filter: true,cellStyle: { fontWeight: 'bold' }  },
    // {
    //   headerName: "Agent",
    //   field: "agent",
    //   editable: true,
    //   cellEditor: CustomAutoCompleteEditor, // Use custom editor for suggestions
    //   cellEditorParams: {
    //     agents: ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emma White"],
    //     onValueChange: handleValueChange, // Pass function as prop
    //   },
    // },
    { headerName: 'OTHER', field: 'other', sortable: true, editable:true, filter: true },
    { headerName: 'Salary', field: 'salary', sortable: true, filter: true },
    { headerName: 'Stationary', field: 'stationary', sortable: true, filter: true },
    { headerName: 'Telephone', field: 'telephone', sortable: true, filter: true },
    { headerName: 'Total Amount', field: 'total_amount', sortable: true, filter: true},
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
    { headerName: 'Remarks', field: 'remarks', editable:true, sortable: true, filter: true },
    { 
      field: "actions",
      pinned: "right" ,
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



  const navigate = useNavigate();

  const handleDeleteRow = useCallback((deletedRow) => {
    console.log("Deleted row data:>", deletedRow);
    handleDelete(deletedRow.id)
  }, []);

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


  return (
    <>
    <Page title="Expense">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-1}>
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
        <UserListToolbar expense={false} handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
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
