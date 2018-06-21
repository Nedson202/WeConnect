import axios from 'axios';
import { ADD_IMAGE } from './types';

const setImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const imageUploader = (userId, image) => dispatch => {
    return axios.put(`/api/v1/user/${userId}`, image).then(
        (res) => dispatch(setImage(res.data.user.image)))
};//eslint-disable-line no-unused-vars

export default imageUploader;
