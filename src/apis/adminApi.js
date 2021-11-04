import callApi from 'utils/callApi';

const adminApi = {
    fetchUserInformation() {
        return callApi(`api/users`)
    }
}

export default adminApi;