import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/insurance/addInsurance';
import { insuranceHeaders } from '../_mock/constant';
import {
  cashColumn,
  deleteColumn,
  fileColumn,
  paymentColumn,
  statusColumn,
  textColumn,
  viewPrintColumn,
} from '../components/list/listColumns';

const columns = ({ onDelete, onPrint, onView }) => [
  fileColumn(),
  textColumn('Name', 'name', { editable: true }),
  textColumn('ID', 'id_number', { editable: true }),
  textColumn('Add/New', 'sub_category'),
  textColumn('Sponser Name', 'sponser_name', { editable: true }),
  cashColumn(),
  statusColumn(),
  paymentColumn(),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  textColumn('Dob', 'dob', { editable: true }),
  textColumn('Company', 'company', { editable: true }),
  textColumn('Agent', 'agent', { editable: true }),
  textColumn('Agent Date', 'paid_date', { editable: true }),
  textColumn('Agent Amount', 'agent_amount'),
  textColumn('Service', 'service'),
  textColumn('Total Amount', 'total_amount'),
  textColumn('Paid Amount', 'paid_amount'),
  textColumn('Balance Amount', 'balance_amount'),
  deleteColumn({ onDelete, onPrint, field: 'Delete' }),
  viewPrintColumn({ onDelete, onPrint, onView }),
];

export default function Insurance() {
  return (
    <ResourceListPage
      title="INSURANCE"
      pageTitle="insurance"
      addLabel="New Insurance"
      resource="insurance"
      csvHeaders={insuranceHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editInsuranceHandler"
    />
  );
}
