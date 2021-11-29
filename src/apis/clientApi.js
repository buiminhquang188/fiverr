import callApi from 'utils/callApi';

const clientApi = {

    // api number 6
    fetchUploadAvatar(imgData, accessToken) {
        return callApi(`api/users/upload-avatar`, 'POST', imgData, accessToken);
    },

    // api number 20
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
    // api number 19 
    fetchAddJob(data, token) {
        return callApi(`api/jobs`, 'POST', data, token);
    },

    //api number 21
    fetchDeleteJob(id, token) {
        return callApi(`api/jobs/${id}`, 'DELETE', null, token)
    },

    // api number 22
    fetchUpdateJob(id, data, token) {
        return callApi(`api/jobs/${id}`, 'PUT', data, token);
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
    // api number 26
    fetchBookingJob(id, token) {
        return callApi(`api/jobs/booking/${id}`, 'PATCH', null, token);
    },
    // api number 27
    fetchCreateJob(token) {
        return callApi(`api/jobs/by-user`, token);
    },

    // api number 29
    searchItem(searchValues) {
        return callApi(`api/jobs/by-name?name=${searchValues}`);
    },
    // api number 30
    fetchUpdateImageJob(id, data, token) {
        return callApi(`api/jobs/upload-image/${id}`, 'POST', data, token);
    },

    // api number 31
    signUpApi(user) {
        return callApi(`api/auth/signup`, "POST", user)
    },

    // api number 32
    loginApi(user) {
        return callApi(`api/auth/signin`, 'POST', user);
    },

    // api number 33
    fetchAddComment(commentData, token) {
        return callApi(`api/comments`, 'POST', commentData, token)
    },

    // ap number 34
    fetchComment(id) {
        return callApi(`api/comments/by-job/${id}`)
    }
}

export default clientApi;