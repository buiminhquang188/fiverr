import Home from "containers/client/Home/Home"
import JobSearch from "containers/client/Home/JobSearch/JobSearch"
import JobCategories from "containers/client/JobCategories/JobCategories"
import JobDetail from "containers/client/JobDetail/JobDetail"
import JobList from "containers/client/JobList/JobList"
import JobType from "containers/client/JobType/JobType"
import Login from 'containers/shared/Auth/Login/Login'
import DashBoard from "containers/admin/DashBoard"
import UserManagement from "containers/admin/UserManagement/UserManagement"
import JobsManagement from "containers/admin/JobsManagement/JobsManagement"
import CommentManagement from "containers/admin/CommentManagement/CommentManagement"

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
        isPrivate: false,
    },
    {
        path: '/admin/users-management',
        component: UserManagement,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/admin/jobs-management',
        component: JobsManagement,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/admin/comment-management',
        component: CommentManagement,
        exact: true,
        isPrivate: false,
    },
]