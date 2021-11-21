import Home from "containers/client/Home/Home"
import JobSearch from "containers/client/Home/JobSearch/JobSearch"
import JobCategories from "containers/client/JobCategories/JobCategories"
import JobDetail from "containers/client/JobDetail/JobDetail"
import JobList from "containers/client/JobList/JobList"
import JobType from "containers/client/JobType/JobType"
import Login from 'containers/shared/Auth/Login/Login'
import DashBoard from "containers/admin/DashBoard"
import UserManagement from "containers/admin/UserManagement/UserManagement"
import MainJobsManagement from "containers/admin/MainJobsManagement/MainJobsManagement"
import SubJobsManagement from "containers/admin/SubJobsManagement/SubJobsManagement"
import SignUp from "containers/shared/Auth/SignUp/SignUp"

export const clientRoutes = [
    {
        path: '/',
        component: Home,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/signup',
        component: SignUp,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-list/main-job/:id',
        component: JobList,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-list/sub-job/:id',
        component: JobList,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-type',
        component: JobType,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-detail/:id',
        component: JobDetail,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-search/search=:searchId',
        component: JobSearch,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-categories/:id',
        component: JobCategories,
        exact: true,
        isPrivate: false,
    },
]

export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: DashBoard,
        exact: true,
        isPrivate: true,
    },
    {
        path: '/admin/users-management',
        component: UserManagement,
        exact: true,
        isPrivate: true,
    },
    {
        path: '/admin/jobs-management/main-jobs',
        component: MainJobsManagement,
        exact: true,
        isPrivate: true,
    },
    {
        path: '/admin/jobs-management/sub-jobs',
        component: SubJobsManagement,
        exact: true,
        isPrivate: true,
    },
]