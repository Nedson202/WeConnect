import axios from 'axios';

const imageUploader = (userId, image) => dispatch => axios.put(`/api/v1/user/${userId}`, image); //eslint-disable-line no-unused-vars

export default imageUploader;
