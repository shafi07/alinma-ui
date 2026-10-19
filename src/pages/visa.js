import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/visa/addVisa';
import { visaHeaders } from '../_mock/constant';
import {
  balanceColumn,
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
  textColumn('Sub Category', 'sub_category'),
  textColumn('Sponser Name', 'sponser_name'),
  cashColumn(),
  statusColumn(),
  paymentColumn(),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  textColumn('Agent', 'agent', { editable: true }),
  textColumn('Agent Date', 'paid_date', { editable: true }),
  textColumn('Visa Number', 'visa_number', { editable: true }),
  textColumn('Service Amount', 'service'),
  textColumn('Government fee', 'government_fee'),
  textColumn('Agent Amount', 'agent_amount'),
  textColumn('Chamber Amount', 'chamber_amount'),
  textColumn('Total Amount', 'total_amount'),
  textColumn('Paid Amount', 'paid_amount'),
  balanceColumn(),
  deleteColumn({ onDelete, onPrint }),
  viewPrintColumn({ onDelete, onPrint, onView }),
];

export default function Visa() {
  return (
    <ResourceListPage
      title="VISA"
      pageTitle="Visa"
      addLabel="New Visa"
      resource="visa"
      csvHeaders={visaHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editVisaHandler"
    />
  );
}
