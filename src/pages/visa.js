import { useState,useEffect, useCallback } from 'react';
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
import {  UserListToolbar } from '../sections/@dashboard/user';
import AddBill from '../components/visa/addVisa'
import EditBill from '../components/javasath/editBill'
import { CSVLink } from 'react-csv';
import axios from 'axios';
import View from 'src/components/view';
import { URL,visaHeaders, } from '../_mock/constant'
import Toast from '../components/toast';
import NewTable from './table';
import DeleteCellRenderer from 'src/components/Cell-renders/DeleteCell';

// ----------------------------------------------------------------------

export default function Visa() {
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
  const[view,setView]=useState(false)
  const [toast,setToast]=useState(false)
  const [message,setMessage]=useState(null)
  const[viewData,setViewData]=useState(null)
  const navigate = useNavigate();

  const [colDef] = useState([
    { headerName: 'File',width: 120, field: 'fileid', sortable: true, filter: true,cellStyle: { fontWeight: 'bold' }  },
    { headerName: 'Name', field: 'name', sortable: true, editable:true, filter: true },
    { headerName: 'ID', field: 'id_number', sortable: true, editable:true, filter: true },
    { headerName: 'Sub Category', field: 'sub_category', sortable: true,filter: true },
    { headerName: 'Sponser Name', field: 'sponser_name', sortable: true,filter: true },
    { 
      headerName: 'Cash', 
      field: 'cash', 
      // pinned: "right" ,
      sortable: true,
      valueGetter: (params) => (params.data.balance_amount == 0 ? "Paid" : "Credit"),
      filter: true,
      cellStyle: (params) => {
        if (params.value === "Paid") {
          return { color: "#229A16",fontWeight: 'bold',textAlign:"center" }; // Green for Adult
        }
        return { color: "#B72136",fontWeight: 'bold',textAlign:"center" }; // Red for Minor
      }, 
      width: 100,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      editable: true, // Enable editing for the dropdown
      cellEditor: "agSelectCellEditor", // Use the built-in dropdown editor
      cellEditorParams: {
        values: ["pending", "completed", "returned", "collected"], // Dropdown options
      },
      cellStyle: (params) => {
        if (params.value === "completed") {
          return { color: "#229A16",fontWeight: 'bold',textAlign:"center" }; // Green for Adult
        }else if(params.value === "returned"){
          return { color: "#F51720",fontWeight: 'bold',textAlign:"center" }; // Red for Minor
        }else if(params.value === "collected"){
          return { color: "#e1c340",fontWeight: 'bold',textAlign:"center" }; // Red for Minor
        }else{
          return { color: "#2065D1",fontWeight: 'bold',textAlign:"center" }; // Red for Minor
        }
      },
    },
    { headerName: 'Mobile', field: 'mobilenumber', sortable: true, editable:true, filter: true },
    { headerName: 'Agent', field: 'agent', sortable: true,filter: true,editable:true },
    { headerName: 'Agent Date', field: 'paid_date', sortable: true,filter: true, editable:true },
    { headerName: 'Visa Number', field: 'visa_number', sortable: true,filter: true, editable:true },
    { headerName: 'Service Amount', field: 'service', sortable: true,filter: true },
    { headerName: 'Government fee', field: 'government_fee', sortable: true,filter: true },
    { headerName: 'Agent Amount', field: 'agent_amount', sortable: true,filter: true },
    { headerName: 'Chamber Amount', field: 'chamber_amount', sortable: true,filter: true },
    { headerName: 'Total Amount', field: 'total_amount', sortable: true,filter: true },
    { headerName: 'Paid Amount', field: 'paid_amount', sortable: true,filter: true },
    { headerName: 'Balance Amount', field: 'balance_amount', sortable: true,filter: true },
    // { 
    //     headerName: 'Created Time', 
    //     field: 'createdtime', 
    //     sortable: true, 
    //     filter: true,
    //     valueFormatter: (params) => {
    //         const date = new Date(params.value);
    //         return date.toLocaleDateString(); // Format: MM/DD/YYYY based on locale
    //       }, 
    // },
    { 
      field: "actions",
      pinned: "right" ,
      cellRenderer: (params) => (
        <DeleteCellRenderer
          node={params.node}
          api={params.api}
          onDelete={handleDeleteRow}
          onPrint = {handlePrint}
          print = {true}
        />
      ), 
      // minWidth: 194,
      width: 150,
      floatingFilter: false ,
      filter: false  
    },
])

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

  const handleCloseAdd = (resetForm)=>{
    setOpen(false)
    resetForm()
  }

  const fetchData = async (query, status) => {
    const url = query || status ? `${URL}/visa?query=${query}&status=${status}` : `${URL}/visa`
    setLoading(true)
    axios.get(url)
      .then((res) => {
        if (res.status == 200) {
          setUSERLIST(res.data)
          setLoading(false)
        } else {
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

  const submitVisa = async (data,actions) => {
    setLoading(true)
    axios.post(`${URL}/visa`, data)
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

  const editVisa = async (data) => {
    console.log('>>><<',data)
    setLoading(true)
    axios.put(`${URL}/visa`, data)
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

  const editVisaHandler = async (data,actions) => {
    setLoading(true)
    axios.patch(`${URL}/visa`, data)
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
    axios.put(`${URL}/visa`, {status:value,id,updatedTime: new Date().toLocaleDateString()})
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
    axios.delete(`${URL}/visa/${id}`)
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
    setLoading(true)
    data == 'All' ? setStatus('') : setStatus(data) 
  }

  const handlePrint = async(data)=>{
    navigate('/print',{state:{path:"visa",...data}})
  }

  const viewOpen = async(data)=>{
    setViewData(data)
    setView(true)
  }

  const handleCellClick = (params) => {
    if (params.colDef.field === "fileid") {
      // const clickedFileId = params.value; 
      const clickedRowData = params.data;
      editDataOpen(clickedRowData)
    }else if (params.colDef.field === "cash") {
      // const clickedFileId = params.value; 
      const clickedRowData = params.data;
      editOpen(clickedRowData)
    }else{
      navigator.clipboard.writeText(params.value)
    }
  }

  return (
    <>
    <Page title="Visa">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-1}>
          <Typography variant="h4" gutterBottom>
            VISA
          </Typography>
          <Button variant="contained" sx={{backgroundColor:'#F51720'}} onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            New Visa
          </Button>
          <CSVLink headers={visaHeaders} data={USERLIST?USERLIST:[]} filename={'test'}>
          <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
            Export CSV
          </Button>
          </CSVLink>
        </Stack>
        <UserListToolbar handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />

        <NewTable 
        rowData={USERLIST} 
        colDef={colDef} 
        handleCellClick={handleCellClick} 
        editData = {editVisaHandler}
        />
      </Container>
      <Toast 
      toast={toast} 
      setToast={setToast} 
      message={message} 
      />
    </Page>
    <AddBill
     open = {open} 
     handleClose = {() => {setEditData(null) ;
      setOpen(false)}}
     submitHandler={submitVisa}
     loading={loading}
    //  editData = {editData}
     />
    {editData ? <EditBill 
     open={editModel}
     editData={editData}
     handleClose = {handleCloseEdit}
     editHandler={editVisa}
     loading={loading}
     /> :''}
     {editData ? <AddBill
     open = {open} 
     handleClose = {() => {setEditData(null) ;
      setOpen(false)}}
     submitHandler={submitVisa}
     loading={loading}
     editData = {editData}
     editVisaHandler={editVisaHandler}
     /> :''}
    {viewData ? <View
    open={view}
    viewData={viewData}
    handleClose = {handleCloseView}
    /> : '' } 
    </>
  );
}
