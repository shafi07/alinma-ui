import ResourceListPage from '../components/list/ResourceListPage';
import { expenseHeaders } from '../_mock/constant';
import { dateColumn, fileColumn, textColumn } from '../components/list/listColumns';

const columns = () => [
  fileColumn({ width: 150, cellStyle: { fontWeight: 'bold', color: 'blue' } }),
  textColumn('Agent', 'agent'),
  textColumn('Service', 'service'),
  textColumn('Sub Category', 'sub_category'),
  textColumn('Agent', 'agent_amount'),
  dateColumn(),
  textColumn('Paid Date', 'paid_date'),
];

export default function Agent() {
  return (
    <ResourceListPage
      title="Agent"
      pageTitle="Agent"
      addLabel="Add Agent"
      resource="agent"
      csvHeaders={expenseHeaders}
      columns={columns}
      filterByStatus={false}
      showToolbar={false}
      addDisabled
      showAddForm
      showEditBill={false}
      showView={false}
      handleCellClick={() => {}}
      inlineEdit={false}
    />
  );
}
