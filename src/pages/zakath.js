import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/zakath/addZakath';
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
  textColumn('Sub Category', 'sub_category'),
  textColumn('Sponser Name', 'sponser_name'),
  cashColumn(),
  statusColumn(),
  paymentColumn(),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  textColumn('Zareeba Date', 'zareeba_date'),
  textColumn('Service Amount', 'service'),
  textColumn('Purchase Amount', 'purchase_amount'),
  textColumn('Sales Amount', 'sales_amount'),
  textColumn('Total Amount', 'total_amount'),
  textColumn('Paid Amount', 'paid_amount'),
  balanceColumn(),
  deleteColumn({ onDelete, onPrint }),
  viewPrintColumn({ onDelete, onPrint, onView }),
];

export default function Zakath() {
  return (
    <ResourceListPage
      title="ZAKATH"
      pageTitle="Zakath"
      addLabel="New Zakath"
      resource="zakath"
      csvHeaders={visaHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editVisaHandler"
    />
  );
}
