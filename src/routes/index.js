import DashBoard from "containers/admin/DashBoard"
import Home from "containers/client/Home/Home"
import JobSearch from "containers/client/Home/JobSearch/JobSearch"
import JobDetail from "containers/client/JobDetail/JobDetail"
import JobList from "containers/client/JobList/JobList"
import JobType from "containers/client/JobType/JobType"
import PageNotFound from 'containers/shared/Auth/PageNotFound/PageNotFound'
export const clientRoutes = [
    {
        path: '/',
        component: Home,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/job-list',
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
        path: '*',
        component: PageNotFound,
        exact: true,
        isPrivate: false,
    },
]

export const adminRoutes = [
    {
        path: '/',
        component: DashBoard,
        exact: true,
        isPrivate: true,
    },
]