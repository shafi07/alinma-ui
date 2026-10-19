import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ResourceListPage from '../components/list/ResourceListPage';
import AddBill from '../components/other/addOther';
import { URL, otherHeaders } from '../_mock/constant';
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
  textColumn('ID number', 'id_number', { editable: true }),
  textColumn('Sub Category', 'sub_category'),
  textColumn('Sponser Name', 'sponser_name'),
  cashColumn(),
  statusColumn(),
  paymentColumn(),
  textColumn('Mobile', 'mobilenumber', { editable: true }),
  textColumn('Agent', 'agent', { editable: true }),
  textColumn('Agent Date', 'paid_date', { editable: true }),
  textColumn('Service Amount', 'service'),
  textColumn('Agent Amount', 'agent_amount'),
  textColumn('Total Amount', 'total_amount'),
  textColumn('Paid Amount', 'paid_amount'),
  balanceColumn(),
  deleteColumn({ onDelete, onPrint }),
  viewPrintColumn({ onDelete, onPrint, onView }),
];

export default function Other() {
  const isPassport = useLocation().pathname.includes('passport');

  const buildUrl = useCallback((query, status) => {
    const type = isPassport ? 'type=passport' : '';
    if (query || status) {
      return `${URL}/other?query=${query}&status=${status}${type ? `&${type}` : ''}`;
    }
    return type ? `${URL}/other?${type}` : `${URL}/other`;
  }, [isPassport]);

  return (
    <ResourceListPage
      title={isPassport ? 'PASSPORT' : 'OTHER'}
      pageTitle={isPassport ? 'Passport' : 'Other'}
      addLabel={isPassport ? 'New Passport' : 'New Other'}
      resource="other"
      csvHeaders={otherHeaders}
      columns={columns}
      AddForm={AddBill}
      editHandlerProp="editOtherHandler"
      buildUrl={buildUrl}
    />
  );
}
