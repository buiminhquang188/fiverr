import callApi from 'utils/callApi';

const adminApi = {
    // api number 1
    fetchUserInformation() {
        return callApi(`api/users`)
    },

    // api number 2
    fetchAddUser(user, token) {
        return callApi(`api/users`, 'POST', user, token)
    },
    // api number 3
    fetchUserDetail(id) {
        return callApi(`api/users/${id}`)
    },

    // api number 4
    fetchUpdateUser(id, user, token) {
        return callApi(`api/users/${id}`, 'PUT', user, token)
    },

    // api number 5
    fetchDeleteUser(id, token) {
        return callApi(`api/users/${id}`, 'DELETE', null, token)
    },

    // api number 7
    fetchFindUser(userName) {
        return callApi(`api/users/pagination-search?name=${userName}&skip=0&limit=0`)
    },

    // api number 8
    fetchAddSubJob(subJob, token) {
        return callApi(`api/sub-type-jobs`, 'POST', subJob, token)
    },

    // api number 9
    fetchSubJobsInformation() {
        return callApi(`api/sub-type-jobs`)
    },

    // api number 10
    fetchSubJobDetail(id) {
        return callApi(`api/sub-type-jobs/${id}`)
    },

    // api number 11
    fetchUpdateSubJob(id, subJob, token) {
        return callApi(`api/sub-type-jobs/${id}`, 'PUT', subJob, token)
    },

    // api number 12 
    fetchDeleteSubJob(id, token) {
        return callApi(`api/sub-type-jobs/${id}`, 'DELETE', token)
    },

    // api number 13
    fetchAddMainJob(mainJob, token) {
        return callApi(`api/type-jobs`, 'POST', mainJob, token)
    },

    // api number 14
    fetchMainJobsInformation() {
        return callApi(`api/type-jobs`)
    },

    // api number 15
    fetchDeleteMainJob(id, token) {
        return callApi(`api/type-jobs/${id}`, 'DELETE', token)
    },

    // api number 18
    fetchUpdateMainJob(id, mainJob, token) {
        return callApi(`api/type-jobs/${id}`, 'PUT', mainJob, token)
    },

    // api number 17
    fetchDetailMainJob(id) {
        return callApi(`api/type-jobs/${id}`)
    }
}

export default adminApi;