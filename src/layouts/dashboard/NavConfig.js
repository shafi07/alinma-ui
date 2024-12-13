// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Alinma Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Javasath',
    path: '/dashboard/javasath',
    icon: getIcon('mdi:passport'),
  },
  {
    title: 'Insurance',
    path: '/dashboard/insurance',
    icon: getIcon('map:insurance-agency'),
  },
  {
    title: 'Work',
    path: '/dashboard/work',
    icon: getIcon('mdi:worker'),
  },
  {
    title: 'Visa',
    path: '/dashboard/visa',
    icon: getIcon('grommet-icons:visa'),
  },
  {
    title: 'Passport',
    path: '/dashboard/passport',
    icon: getIcon('icon-park-outline:passport'),
  },
  {
    title: 'Other',
    path: '/dashboard/other',
    icon: getIcon('mdi:wall'),
  },
  {
    title: 'Agent',
    path: '/dashboard/agent',
    icon: getIcon('mdi:face-agent'),
  },
  {
    title: 'Customer-Details',
    path: '/dashboard/customer',
    icon: getIcon('carbon:customer-service'),
  },
  {
    title: 'Expense',
    path: '/dashboard/expense',
    icon: getIcon('game-icons:expense'),
  },
  {
    title: 'Bulk-Add',
    path: '/dashboard/bulkAdd',
    icon: getIcon('eva:plus-fill'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
