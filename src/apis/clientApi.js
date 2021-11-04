import callApi from 'utils/callApi';

const clientApi = {
    fetchItem() {
        return callApi(`api/jobs`)
    }
}

export default clientApi;