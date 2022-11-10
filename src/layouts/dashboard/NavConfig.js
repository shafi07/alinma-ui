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
    icon: getIcon('mdi:alpha-j-box'),
  },
  {
    title: 'Insurance',
    path: '/dashboard/insurance',
    icon: getIcon('mdi:alpha-i-box'),
  },
  {
    title: 'Work',
    path: '/dashboard/work',
    icon: getIcon('mdi:alpha-w-box'),
  },
  {
    title: 'Other',
    path: '/dashboard/other',
    icon: getIcon('mdi:wall'),
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
