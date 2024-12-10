import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
// material
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { CSVLink } from 'react-csv';
import axios from 'axios';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { UserListToolbar } from '../sections/@dashboard/user';
import AddBill from '../components/other/addOther'
import EditBill from '../components/javasath/editBill'
import View from 'src/components/view';
import { URL, otherHeaders } from '../_mock/constant'
import Toast from '../components/toast';
import DeleteCellRenderer from 'src/components/Cell-renders/DeleteCell';
import NewTable from './table';

export default function Other() {
  const routerPath = useLocation()
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [query, setQuey] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [open, setOpen] = useState(false)
  const [USERLIST, setUSERLIST] = useState([])
  const [editData, setEditData] = useState(null)
  const [editModel, setEditModel] = useState(false)
  const [reFetch, setReFetch] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [view, setView] = useState(false)
  const [toast, setToast] = useState(false)
  const [message, setMessage] = useState(null)
  const [viewData, setViewData] = useState(null)
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  let scrl = useRef(null);
  const navigate = useNavigate();
  const path = routerPath.pathname.includes("passport")

  const [colDef] = useState([
    { headerName: 'File',width: 120, field: 'fileid', sortable: true, filter: true,cellStyle: { fontWeight: 'bold' }  },
    { headerName: 'Name', field: 'name', sortable: true, editable:true, filter: true },
    { headerName: 'ID number', field: 'id_number', sortable: true, editable:true, filter: true },
    { headerName: 'Sub Category', field: 'sub_category', sortable: true,filter: true },
    { headerName: 'Sponser Name', field: 'sponser_name', sortable: true,filter: true },
    { 
      headerName: 'Cash', 
      field: 'cash', 
      sortable: true,
      valueGetter: (params) => (params.data.balance_amount == 0 ? "Paid" : "Credit"),
      filter: true,
      cellStyle: (params) => {
        if (params.value === "Paid") {
          return { color: "#229A16",fontWeight: 'bold',textAlign:"center" }; // Green for Adult
        }
        return { color: "#B72136",fontWeight: 'bold',textAlign:"center" }; // Red for Minor
      }, 
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
    { headerName: 'Service Amount', field: 'service', sortable: true,filter: true },
    { headerName: 'Agent Amount', field: 'agent_amount', sortable: true,filter: true },
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

// const handlePrintRow = useCallback((printRow) => {
//   console.log("Deleted row data:>", printRow);
//   // handleDelete(deletedRow.id)
// }, []);

  useEffect(() => {
    fetchData(query, status);
  }, [query, reFetch, status, path]);

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

  const handleCloseEdit = () => {
    setEditData(null)
    setEditModel(!editModel)
  }

  const handleCloseView = () => {
    setViewData(null)
    setView(!view)
  }

  const getUrl = async (query,status) => {
    let url = query || status ? `${URL}/other?query=${query}&status=${status}` : `${URL}/other`
    const isPassport = routerPath.pathname.includes("passport")
    if (isPassport) {
      url = query || status ? `${URL}/other?query=${query}&status=${status}&type=passport` : `${URL}/other?type=passport`
    }
    return url
  } 

  const fetchData = async (query, status) => {
    const url = await getUrl(query, status)
    setLoading(true)
    axios.get(url)
      .then((res) => {
        if (res.status == 200) {
          setUSERLIST(res.data)
          console.log('>>><<<<',res.data)
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

  const editOpen = async (data) => {
    setEditData(data)
    setEditModel(true)
  }

  const editDataOpen = async (data) => {
    setEditData(data)
    setOpen(true)
  }

  // const filteredUsers = USERLIST.length >= 0 ? applySortFilter(USERLIST, getComparator(order, orderBy), filterName) : [];

  const submitOther = async (data, actions) => {
    setLoading(true)
    axios.post(`${URL}/other`, data)
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

  const editOther = async (data) => {
    setLoading(true)
    axios.put(`${URL}/other`, data)
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

  const editOtherHandler = async (data, actions) => {
    setLoading(true)
    axios.patch(`${URL}/other`, data)
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

  const handleStatusChange = async (value, id) => {
    setLoading(true)
    axios.put(`${URL}/other`, { status: value, id, updatedTime: new Date().toLocaleDateString() })
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
    axios.delete(`${URL}/other/${id}`)
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

  const handleStatusFilter = async (data) => {
    setLoading(true)
    data == 'All' ? setStatus('') : setStatus(data)
  }

  const handlePrint = async (data) => {
    navigate('/print', { state: { path: "other", ...data } })
  }

  const viewOpen = async (data) => {
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

  // const scrollCheck = () => {
  //   setscrollX(scrl.current.scrollLeft);
  //   if (
  //     Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
  //     scrl.current.offsetWidth
  //   ) {
  //     setscrolEnd(true);
  //   } else {
  //     setscrolEnd(false);
  //   }
  // };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const isUserNotFound = USERLIST.length === 0;

  return (
    <>
      <Page title={path?`Passport`:`Other`}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-1}>
            <Typography variant="h4" gutterBottom>
              {path ? `PASSPORT` : `OTHER`}
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#F51720' }} onClick={() => setOpen(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
              {path ?`New Passport`:`New Other`}
            </Button>
            <CSVLink headers={otherHeaders} data={USERLIST ? USERLIST : []} filename={'test'}>
              <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
                Export CSV
              </Button>
            </CSVLink>
          </Stack>
          <UserListToolbar slide={slide} handleStatusFilter={handleStatusFilter} status={status} numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
          
          <NewTable 
        rowData={USERLIST} 
        colDef={colDef} 
        handleCellClick={handleCellClick} 
        editData = {editOtherHandler}
        onDelete = {handleDeleteRow}
        />
        </Container>
        <Toast toast={toast} setToast={setToast} message={message} />
      </Page>
      <AddBill
        open={open}
        handleClose={() => setOpen(false)}
        submitHandler={submitOther}
        loading={loading}
      />
      {editData ? <EditBill
        open={editModel}
        editData={editData}
        handleClose={handleCloseEdit}
        editHandler={editOther}
        loading={loading}
      /> : ''}
      {editData ? <AddBill
        open={open}
        handleClose={() => {
          setEditData(null);
          setOpen(false)
        }}
        submitHandler={submitOther}
        loading={loading}
        editData={editData}
        editOtherHandler={editOtherHandler}
      /> : ''}
      {viewData ? <View
        open={view}
        viewData={viewData}
        handleClose={handleCloseView}
      /> : ''}
    </>
  );
}
