import callApi from 'utils/callApi';

const clientApi = {
    fetchItem() {
        return callApi(`api/jobs`)
    },

    // api number 29
    searchItem(searchValues) {
        return callApi(`api/jobs/by-name?name=${searchValues}`)
    },
}

export default clientApi;