import Iconify from '../../components/Iconify';

const icon = (name) => <Iconify icon={name} width={18} height={18} />;

export const pageMeta = {
  '/dashboard/app': { title: 'Dashboard', group: 'Overview' },
  '/dashboard/javasath': { title: 'Javasath', group: 'Services' },
  '/dashboard/insurance': { title: 'Insurance', group: 'Services' },
  '/dashboard/work': { title: 'Work', group: 'Services' },
  '/dashboard/visa': { title: 'Visa', group: 'Services' },
  '/dashboard/passport': { title: 'Passport', group: 'Services' },
  '/dashboard/other': { title: 'Other', group: 'Services' },
  '/dashboard/agent': { title: 'Agents', group: 'People' },
  '/dashboard/customer': { title: 'Customers', group: 'People' },
  '/dashboard/zakath': { title: 'Zakath', group: 'Finance' },
  '/dashboard/expense': { title: 'Expenses', group: 'Finance' },
  '/dashboard/bulkAdd': { title: 'Bulk add', group: 'Tools' },
};

const navConfig = [
  { title: 'Dashboard', path: '/dashboard/app', icon: icon('mdi:view-dashboard-outline') },
  { title: 'Javasath', path: '/dashboard/javasath', icon: icon('mdi:passport') },
  { title: 'Insurance', path: '/dashboard/insurance', icon: icon('mdi:shield-check-outline') },
  { title: 'Work', path: '/dashboard/work', icon: icon('mdi:hammer-wrench') },
  { title: 'Visa', path: '/dashboard/visa', icon: icon('mdi:airplane') },
  { title: 'Passport', path: '/dashboard/passport', icon: icon('mdi:book-open-page-variant-outline') },
  { title: 'Other', path: '/dashboard/other', icon: icon('mdi:dots-grid') },
  { title: 'Agents', path: '/dashboard/agent', icon: icon('mdi:face-agent') },
  { title: 'Customers', path: '/dashboard/customer', icon: icon('mdi:account-outline') },
  { title: 'Zakath', path: '/dashboard/zakath', icon: icon('mdi:hand-coin-outline') },
  { title: 'Expense', path: '/dashboard/expense', icon: icon('mdi:wallet-outline') },
  { title: 'Bulk add', path: '/dashboard/bulkAdd', icon: icon('mdi:plus-box-outline') },
];

export default navConfig;
