import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/customer-details/addCustomer';
import { expenseHeaders } from '../_mock/constant';
import { dateColumn, deleteColumn, fileColumn, textColumn } from '../components/list/listColumns';

const columns = ({ onDelete }) => [
  fileColumn(),
  textColumn('Name', 'name', { editable: true }),
  textColumn('ID number', 'id_number', { editable: true }),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  dateColumn(),
  deleteColumn({ onDelete, width: 150 }),
];

export default function Customer() {
  return (
    <ResourceListPage
      title="CUSTOMER-DETAILS"
      pageTitle="Customer Details"
      addLabel="New"
      resource="customer"
      csvHeaders={expenseHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editCustomerHandler"
      filterByStatus={false}
      showStatusFilter={false}
      showView={false}
      inlineEdit="put"
      formEdit="put"
    />
  );
}
