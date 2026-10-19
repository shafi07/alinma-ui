import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/javasath/addJavasath';
import { javasathHeaders } from '../_mock/constant';
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
  textColumn('Sub Category', 'sub_category'),
  textColumn('ID', 'id_number', { editable: true }),
  textColumn('Sponser Name', 'sponser_name', { editable: true }),
  cashColumn(),
  statusColumn(),
  paymentColumn(),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  textColumn('Agent Amount', 'agent_amount'),
  textColumn('Service', 'service'),
  textColumn('Total Amount', 'total_amount'),
  textColumn('Paid Amount', 'paid_amount'),
  balanceColumn(),
  deleteColumn({ onDelete, onPrint }),
  viewPrintColumn({ onDelete, onPrint, onView }),
];

export default function User() {
  return (
    <ResourceListPage
      title="JAVASATH"
      pageTitle="Javasath"
      addLabel="New Javasath"
      resource="javasath"
      csvHeaders={javasathHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editJavazathHandler"
    />
  );
}
