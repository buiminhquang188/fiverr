import callApi from 'utils/callApi';

const clientApi = {
    fetchItem() {
        return callApi(`api/jobs`);
    },
    // api number 14
    fetchTypeJobs() {
        return callApi(`api/type-jobs`);
    },
    // api number 17
    fetchSubTypeJobs(id) {
        return callApi(`api/type-jobs/${id}`);
    },
    // api number 23
    fetchDetailJobs(id) {
        return callApi(`api/jobs/${id}`);
    },
    // api number 24
    fetchSubJobs(id) {
        return callApi(`api/jobs/by-sub-type?subType=${id}&skip=0&llimit=10`)
    },
    // api number 25
    fetchMainJobs(id) {
        return callApi(`api/jobs/by-type?type=${id}&skip=0&llimit=10`);
    },
    // api number 29
    searchItem(searchValues) {
        return callApi(`api/jobs/by-name?name=${searchValues}`);
    },
}

export default clientApi;