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
<<<<<<< HEAD
    fetchDetailJob(id) {
=======
    fetchDetailJobs(id) {
>>>>>>> 62a803aa7f692741f80f952b3b02bb416c0bfd7d
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