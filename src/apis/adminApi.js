import callApi from 'utils/callApi';

const adminApi = {
    // api number 1
    fetchUserInformation() {
        return callApi(`api/users`)
    },

    // api number 2
    fetchAddUser(user) {
        return callApi(`api/users`, 'POST', user)
    },
    // api number 3
    fetchUserDetail(id) {
        return callApi(`api/users/${id}`)
    },

    // api number 4
    fetchUpdateUser(id, user) {
        return callApi(`api/users/${id}`, 'PUT', user)
    },

    // api number 5
    fetchDeleteUser(id) {
        return callApi(`api/users/${id}`, 'DELETE')
    },

    // api number 7
    fetchFindUser(userName) {
        return callApi(`api/users/pagination-search?name=${userName}&skip=0&limit=0`)
    },

    // api number 8
    fetchAddSubJob(subJob) {
        return callApi(`api/sub-type-jobs`, 'POST', subJob)
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
    fetchUpdateSubJob(id, subJob) {
        return callApi(`api/sub-type-jobs/${id}`, 'PUT', subJob)
    },

    // api number 12 
    fetchDeleteSubJob(id) {
        return callApi(`api/sub-type-jobs/${id}`, 'DELETE')
    },

    // api number 13
    fetchAddMainJob(mainJob) {
        return callApi(`api/type-jobs`, 'POST', mainJob)
    },

    // api number 14
    fetchMainJobsInformation() {
        return callApi(`api/type-jobs`)
    },

    // api number 15
    fetchDeleteMainJob(id) {
        return callApi(`api/type-jobs/${id}`, 'DELETE')
    },

    // api number 18
    fetchUpdateMainJob(id, mainJob) {
        return callApi(`api/type-jobs/${id}`, 'PUT', mainJob)
    },

    // api number 17
    fetchDetailMainJob(id) {
        return callApi(`api/type-jobs/${id}`)
    }
}

export default adminApi;