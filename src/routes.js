import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

const User = lazy(() => import('./pages/Javasath'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/Page404'));
const DashboardApp = lazy(() => import('./pages/DashboardApp'));
const Print = lazy(() => import('./pages/print'));
const Insurance = lazy(() => import('./pages/insurance'));
const Work = lazy(() => import('./pages/Work'));
const Other = lazy(() => import('./pages/Other'));
const Visa = lazy(() => import('./pages/visa'));
const Expense = lazy(() => import('./pages/expense'));
const Agent = lazy(() => import('./pages/agent'));
const Customer = lazy(() => import('./pages/customerDetails'));
const BulkAdd = lazy(() => import('./pages/BulkAdd'));
const Zakath = lazy(() => import('./pages/zakath'));

function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress />
    </Box>
  );
}

// ----------------------------------------------------------------------

export default function Router() {
  const isLoggedIn = localStorage.getItem('auth') !== null;

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'javasath', element: <User /> },
        { path: 'insurance', element: <Insurance /> },
        { path: 'work', element: <Work /> },
        { path: 'visa', element: <Visa /> },
        { path: 'passport', element: <Other /> },
        { path: 'other', element: <Other /> },
        { path: 'agent', element: <Agent /> },
        { path: 'customer', element: <Customer /> },
        { path: 'expense', element: <Expense /> },
        { path: 'bulkAdd', element: <BulkAdd /> },
        { path: 'zakath', element: <Zakath /> },
      ],
    },
    {
      path: 'print',
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

  return <Suspense fallback={<PageLoader />}>{routes}</Suspense>;
}
