import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect,useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
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
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import AddBill from '../components/addBill'
import Print from './print'

// ----------------------------------------------------------------------
const URL =`http://alinma-env.eba-8frrdp32.ap-south-1.elasticbeanstalk.com`
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Sub category', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'mol', label: 'Mol', alignRight: false },
  { id: 'iqama', label: 'Iqama', alignRight: false },
  { id: 'insurance', label: 'Insurance', alignRight: false },
  { id: 'service', label: 'Service', alignRight: false },
  { id: 'other', label: 'other', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  { id: '' },
];

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

  const [query,setQuey]= useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open,setOpen] = useState(false)

  const[USERLIST,setUSERLIST]=useState([])

  const [editData,setEditData]=useState(null)

  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });


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
  },[query]);

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

  const fetchData = async (query) => {
    const url = query ? `${URL}/javasath?query=${query}` : `${URL}/javasath`
    const response = await fetch(url);
    const newData = await response.json()
    console.log('<<<<',newData)
    setUSERLIST(newData)
  };

  const openAddJavasath= async()=>{
    setOpen(true)
  }
  
  const closeAddJavasath= async()=>{
    setOpen(false)
  }

  const editJavasath = async (data)=>{
    setOpen(true)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = USERLIST.length>=0?applySortFilter(USERLIST, getComparator(order, orderBy), filterName):[];

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <>
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Javasath
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            New Javasath
          </Button>
          <Button variant="contained" onClick={() => setOpen(true)}   startIcon={<Iconify icon="eva:plus-fill" />}>
            Export CSV
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={query} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer>
              <Table style={{width:"200%"}}>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, sub_category='dss', status='banned', insurance,service,sponser_name='test',paid_amount='test',balance_amount='test',iqama='test',mol='test',mobileNumber='989898989898',other='test',total_amount } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        align = 'center'
                        sx = {{backgroundColor: status === 'banned'?'#FFCCCB':'#90EE90'}}
                        onClick={() => setOpen(true)} 
                      >
                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{sub_category}</TableCell>
                        <TableCell align="left">{sponser_name}</TableCell>
                        <TableCell align="left">{mobileNumber}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status === 'banned'? 'Debit':'Paid')}
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
                        <TableCell align="left" onClick={(e) =>{e.stopPropagation()} }>
                          < PrintIcon />
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu />
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
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
    <AddBill
     open = {open} 
     handleClose = {() => setOpen(false)}
     />
     {/* <Print ref={componentRef} /> */}
    </>
  );
}
