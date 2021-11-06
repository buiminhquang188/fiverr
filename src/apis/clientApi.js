import callApi from 'utils/callApi';

const clientApi = {
    fetchItem() {
        return callApi(`api/jobs`);
    },
    // api number 14
    fetchTypeJobs() {
        return callApi(`api/type-jobs`);
    },
    // api number 23
    fetchItemById(id) {
        return callApi(`api/jobs/${id}`);
    },

    // api number 29
    searchItem(searchValues) {
        return callApi(`api/jobs/by-name?name=${searchValues}`);
    },
}

export default clientApi;