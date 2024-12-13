import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import User from './pages/Javasath';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import DashboardApp from './pages/DashboardApp';
import Print from './pages/print'
import Insurance from './pages/insurance';
import Work from './pages/Work';
import Other from './pages/Other'
import Visa from './pages/visa';
import Expense from './pages/expense';
import Agent from './pages/agent';
import Customer from './pages/customerDetails';
import BulkAdd from './pages/BulkAdd';

// ----------------------------------------------------------------------

export default function Router() {
  let isLoggedIn = false
      isLoggedIn = (localStorage.getItem("auth") === null) ? false : true
      // console.log('>>>>>>>>llklkkk',localStorage.getItem("auth") )
  return useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn? <DashboardLayout /> : <Navigate to="/login" /> ,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'javasath', element:<User /> },
        { path: 'insurance', element: <Insurance />},
        { path: 'work', element:<Work />},
        { path: 'visa', element:<Visa />},
        { path: 'passport', element:<Other /> },
        { path: 'other', element:<Other /> },
        { path: 'agent', element:<Agent /> },
        { path: 'customer', element:<Customer /> },
        { path: 'expense', element:<Expense /> },
        { path: 'bulkAdd', element:<BulkAdd /> },
      ],
    },
    {
      path:'print',
      element: <Print />,
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
