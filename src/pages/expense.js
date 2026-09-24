import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/expense/addExpense';
import { expenseHeaders } from '../_mock/constant';
import { dateColumn, deleteColumn, textColumn } from '../components/list/listColumns';

const columns = ({ onDelete }) => [
  { headerName: 'File ID', width: 120, field: 'fileid', sortable: true, filter: true, cellStyle: { fontWeight: 'bold' } },
  textColumn('OTHER', 'other', { editable: true }),
  textColumn('Salary', 'salary'),
  textColumn('Stationary', 'stationary'),
  textColumn('Telephone', 'telephone'),
  textColumn('Total Amount', 'total_amount'),
  dateColumn(),
  textColumn('Remarks', 'remarks', { editable: true }),
  deleteColumn({ onDelete, width: 150 }),
];

export default function Expense() {
  return (
    <ResourceListPage
      title="EXPENSE"
      pageTitle="Expense"
      addLabel="Add Expense"
      resource="expense"
      csvHeaders={expenseHeaders}
      columns={columns}
      AddForm={AddBill}
      filterByStatus={false}
      showStatusFilter={false}
      showEditBill
      showView={false}
      handleCellClick={() => {}}
      inlineEdit={false}
    />
  );
}
