import DeleteCellRenderer from '../Cell-renders/DeleteCell';

export const fileColumn = (extra = {}) => ({
  headerName: 'File',
  width: 130,
  minWidth: 110,
  flex: 0,
  field: 'fileid',
  sortable: true,
  filter: true,
  cellStyle: { fontWeight: 'bold' },
  ...extra,
});

export const textColumn = (headerName, field, extra = {}) => ({
  headerName,
  field,
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 150,
  ...extra,
});

export const dateColumn = (headerName = 'Created Time', field = 'createdtime') => ({
  headerName,
  field,
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 150,
  valueFormatter: (params) => {
    const date = new Date(params.value);
    return date.toLocaleDateString();
  },
});

export const cashColumn = () => ({
  headerName: 'Cash',
  field: 'cash',
  sortable: true,
  valueGetter: (params) => (params.data.balance_amount == 0 ? 'Paid' : 'Credit'),
  filter: true,
  cellStyle: (params) => {
    if (params.value === 'Paid') {
      return { color: '#32CD30', fontWeight: 'bold', textAlign: 'center' };
    }
    return { color: '#B72136', fontWeight: 'bold', textAlign: 'center' };
  },
  width: 96,
  minWidth: 88,
  flex: 0,
  pinned: 'right',
});

export const statusColumn = () => ({
  headerName: 'Status',
  field: 'status',
  sortable: true,
  filter: true,
  editable: true,
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['pending', 'completed', 'returned', 'collected'],
  },
  cellStyle: (params) => {
    if (params.value === 'completed') {
      return { color: '#229A16', fontWeight: 'bold', textAlign: 'center' };
    }
    if (params.value === 'returned') {
      return { color: '#F51720', fontWeight: 'bold', textAlign: 'center' };
    }
    if (params.value === 'collected') {
      return { color: '#e1c340', fontWeight: 'bold', textAlign: 'center' };
    }
    return { color: '#2065D1', fontWeight: 'bold', textAlign: 'center' };
  },
  pinned: 'right',
  width: 130,
  minWidth: 120,
  flex: 0,
});

export const paymentColumn = () => ({
  headerName: 'Payment',
  field: 'payment_method',
  sortable: true,
  filter: true,
  editable: (params) => params.data.balance_amount == 0,
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['cash', 'sbk', 'bank', 'Account'],
  },
  cellStyle: { fontWeight: 'bold' },
  pinned: 'right',
  width: 110,
  minWidth: 100,
  flex: 0,
});

export const deleteColumn = ({ onDelete, onPrint, field = 'actions', width = 80 }) => ({
  field,
  pinned: 'right',
  cellRenderer: (params) => (
    <DeleteCellRenderer node={params.node} api={params.api} onDelete={onDelete} onPrint={onPrint} />
  ),
  width,
  minWidth: width,
  flex: 0,
  floatingFilter: false,
  filter: false,
});

export const viewPrintColumn = ({ onDelete, onPrint, onView }) => ({
  field: 'View/Print',
  cellRenderer: (params) => (
    <DeleteCellRenderer
      node={params.node}
      api={params.api}
      onDelete={onDelete}
      onPrint={onPrint}
      onView={onView}
      print
      view
    />
  ),
  width: 150,
  minWidth: 140,
  flex: 0,
  floatingFilter: false,
  filter: false,
});
