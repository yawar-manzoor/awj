import { lazy, Suspense } from 'react'
import Loader from '../components/ui/Loader'
import Layout from '../layout/Layout'
import ErrorPage from './ErrorPage'

const Landbank = lazy(() => import('../pages/LandBank'))
const MoreAnalytics = lazy(() => import('../pages/Analytics'))
const Reports = lazy(() => import('../pages/Reports/Reports'))
const CardsAll = lazy(() => import('../pages/CardsAll'))
const LandOverViewDetails = lazy(() =>
    import('../pages/LandDetails/LandOverviewDetails')
)
const AddSplitDashbaord = lazy(() => import('../pages/AddSplit-Dashbaord'))
const LandSplitting = lazy(() => import('../pages/LandSplitting/LandSplitting'))
const ApproverDashboard = lazy(() =>
    import('../pages/Approver/ApproverDashboard')
)
const ApproverAnalytics = lazy(() =>
    import('../pages/Approver/ApproverAnalytics')
)
const LandInfoUpdate = lazy(() => import('../pages/Approver/LandInfoUpdate'))

const Login = lazy(() => import('../pages/login/Login'))
const LandAdmin = lazy(() => import('../pages/Admin/LandAdmin'))
import MainLand from '../pages/AddLand/MainLand'
import AfterLogoutScreen from '../pages/logout/AfterLogoutScreen'
const UserManagement = lazy(() =>
    import('../pages/UserManagement/UserManagement')
)
export const routesList = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                element: (
                    <Suspense fallback={<Loader />}>
                        <Landbank />
                    </Suspense>
                ),
            },
            {
                path: 'user-management',
                element: (
                    <Suspense fallback={<Loader />}>
                        <UserManagement />
                    </Suspense>
                ),
            },
            {
                path: 'add-split-dashboard',
                element: (
                    <Suspense fallback={<Loader />}>
                        <AddSplitDashbaord />
                    </Suspense>
                ),
            },
            {
                path: 'landbank',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Landbank />
                    </Suspense>
                ),
            },
            {
                path: 'analytics',
                element: (
                    <Suspense fallback={<Loader />}>
                        <MoreAnalytics />
                    </Suspense>
                ),
            },
            {
                path: 'reports',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Reports />
                    </Suspense>
                ),
            },
            {
                path: 'view-all',
                element: (
                    <Suspense fallback={<Loader />}>
                        <CardsAll />
                    </Suspense>
                ),
            },
            {
                path: 'land-overview',
                element: (
                    <Suspense fallback={<Loader />}>
                        <LandOverViewDetails />
                    </Suspense>
                ),
            },
            {
                path: 'add-land',
                element: (
                    <Suspense fallback={<Loader />}>
                        <MainLand />
                    </Suspense>
                ),
            },
            {
                path: 'land-splitting',
                element: (
                    <Suspense fallback={<Loader />}>
                        <LandSplitting />
                    </Suspense>
                ),
            },
            {
                path: 'approver-dashboard',
                element: (
                    <Suspense fallback={<Loader />}>
                        <ApproverDashboard />
                    </Suspense>
                ),
            },
            {
                path: 'approver-analytics',
                element: (
                    <Suspense fallback={<Loader />}>
                        <ApproverAnalytics />
                    </Suspense>
                ),
            },
            {
                path: 'landinfo-update',
                element: (
                    <Suspense fallback={<Loader />}>
                        <LandInfoUpdate />
                    </Suspense>
                ),
            },
            {
                path: 'landadmin',
                element: (
                    <Suspense fallback={<Loader />}>
                        <LandAdmin />
                    </Suspense>
                ),
            },
            {
                path: 'logout',
                element: (
                    <Suspense fallback={<Loader />}>
                        <AfterLogoutScreen />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/*',
        element: (
            <Suspense fallback={<Loader />}>
                <ErrorPage />
            </Suspense>
        ),
    },

    {
        index: true,
        element: (
            <Suspense fallback={<Loader />}>
                <Login />
            </Suspense>
        ),
    },
]
