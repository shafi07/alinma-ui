import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/work/addWork';
import { workHeaders } from '../_mock/constant';
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
  textColumn('Number', 'id_number', { editable: true }),
  textColumn('Sub Category', 'sub_category'),
  textColumn('Sponser Name', 'sponser_name'),
  cashColumn(),
  statusColumn(),
  paymentColumn(),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  textColumn('Agent', 'agent', { editable: true }),
  textColumn('Agent Date', 'paid_date', { editable: true }),
  textColumn('Agent Amount', 'agent_amount'),
  textColumn('Service', 'service'),
  textColumn('Government fee', 'government_fee'),
  textColumn('Total Amount', 'total_amount'),
  textColumn('Paid Amount', 'paid_amount'),
  textColumn('Balance Amount', 'balance_amount'),
  deleteColumn({ onDelete, onPrint }),
  viewPrintColumn({ onDelete, onPrint, onView }),
];

export default function Work() {
  return (
    <ResourceListPage
      title="WORK"
      pageTitle="Work"
      addLabel="New Work"
      resource="work"
      csvHeaders={workHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editWorkHandler"
    />
  );
}
