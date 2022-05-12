import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import { RouteObject } from 'react-router-dom';

//Public Pages

//Admin Pages
import Dashboard from '../pages/Layout/Dashboard';
import Page404 from '../components/Page404';
import Login from '../pages/Home/Login';
import CreateNewPassword from '../pages/Home/CreateNewPassword';
import ResetPassword from '../pages/Home/ResetPassword';
import GearLevelDevice from '../pages/Users/GearLevelDevice';
import SettingDisplayDevice from '../pages/Users/SettingDisplayDevice';
import SettingGearDevice from '../pages/Users/SettingGearLevelDevice';
import SettingViewDevice from '../pages/Users/SettingViewDeviceCounte';
import ViewDeviceCounte from '../pages/Users/ViewDeviceCounte';
import ViewDeviceMain from '../pages/Users/ViewDeviceMain';
import DrawNumbers from '../pages/User-Interaction/DrawNumbers';
import LoginViewProfile from '../pages/Home/LoginViewProfile';
import Profile from '../pages/Layout/Profile';
import DeviceManager from '../pages/Layout/DeviceManagement';
import AddDevice from '../pages/Layout/DeviceManagement/AddDevice';
import DetailDevice from '../pages/Layout/DeviceManagement/DetailDevice';
import UpdateDevice from '../pages/Layout/DeviceManagement/UpdateDevice';
import ServiceManager from '../pages/Layout/ServiceManager';
import AddService from '../pages/Layout/ServiceManager/AddService';
import UpdateService from '../pages/Layout/ServiceManager/UpdateService';
import DetailService from '../pages/Layout/ServiceManager/DetailService';
import ReportManager from '../pages/Layout/ReportManagement';
import ProgressManager from '../pages/Layout/ProgressionManager';
import AddProgression from '../pages/Layout/ProgressionManager/AddProgression';
import DetailProgression from '../pages/Layout/ProgressionManager/DetailProgression';
import OleManager from '../pages/Layout/OleManagement';
import AddOle from '../pages/Layout/OleManagement/AddOle';
import UpdateOle from '../pages/Layout/OleManagement/UpdateOle';
import UserManager from '../pages/Layout/UserManagement';
import AddUser from '../pages/Layout/UserManagement/AddUser';
import UpdateUser from '../pages/Layout/UserManagement/UpdateUser';
import UserLog from '../pages/Layout/UserLog';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PublicRoute>
        <h2>Wellcome to DuongNam</h2>
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/resetpass',
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/newpass',
    element: (
      <PublicRoute>
        <CreateNewPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/level-device',
    element: (
      <PublicRoute>
        <GearLevelDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/view-device',
    element: (
      <PublicRoute>
        <ViewDeviceCounte />
      </PublicRoute>
    ),
  },

  {
    path: '/view-device-main',
    element: (
      <PublicRoute>
        <ViewDeviceMain />
      </PublicRoute>
    ),
  },
  {
    path: '/setting-device',
    element: (
      <PublicRoute>
        <SettingGearDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/setting-display-device',
    element: (
      <PublicRoute>
        <SettingDisplayDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/setting-view-device',
    element: (
      <PublicRoute>
        <SettingViewDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/draw-number',
    element: (
      <PublicRoute>
        <DrawNumbers />
      </PublicRoute>
    ),
  },
  {
    path: '/login-profile',
    element: (
      <PublicRoute>
        <LoginViewProfile />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management',
    element: (
      <PrivateRoute>
        <DeviceManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management/add',
    element: (
      <PrivateRoute>
        <AddDevice />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management/detail/:id',
    element: (
      <PrivateRoute>
        <DetailDevice />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateDevice />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management',
    element: (
      <PrivateRoute>
        <ServiceManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management/add',
    element: (
      <PrivateRoute>
        <AddService />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateService />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management/detail/:id',
    element: (
      <PrivateRoute>
        <DetailService />
      </PrivateRoute>
    ),
  },
  {
    path: '/reports-management',
    element: (
      <PrivateRoute>
        <ReportManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/progression-management',
    element: (
      <PrivateRoute>
        <ProgressManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/progression-management/add',
    element: (
      <PrivateRoute>
        <AddProgression />
      </PrivateRoute>
    ),
  },
  {
    path: '/progression-management/detail/:id',
    element: (
      <PrivateRoute>
        <DetailProgression />
      </PrivateRoute>
    ),
  },
  {
    path: '/ole-management',
    element: (
      <PrivateRoute>
        <OleManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/ole-management/add',
    element: (
      <PrivateRoute>
        <AddOle />
      </PrivateRoute>
    ),
  },
  {
    path: '/ole-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateOle />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-management',
    element: (
      <PrivateRoute>
        <UserManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-management/add',
    element: (
      <PrivateRoute>
        <AddUser />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateUser />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-log',
    element: (
      <PrivateRoute>
        <UserLog />
      </PrivateRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: (
      <PublicRoute>
        <Page404 />
      </PublicRoute>
    ),
  },
];
