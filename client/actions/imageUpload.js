import axios from 'axios';
import { ADD_IMAGE, SET_BUSINESS_BY_ID } from './types';
import setAuthToken from '../utils/setAuthToken';
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {String} image
 *
 * @return {Object} action dispatched by the action creator
 */
const setImage = image => ({
  type: ADD_IMAGE,
  image
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {Oject} business
 *
 * @return {Object} action dispatched by the action creator
 */
const setBusinessById = business => ({
  type: SET_BUSINESS_BY_ID,
  business
});
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {String} image
 * @param {String} UPLOAD_PRESET
 * @param {String} CLOUDINARY_API
 *
 * @return {Object} action dispatched by the action creator
 */
const uploadToCloudinary = (image, UPLOAD_PRESET, CLOUDINARY_API) => (dispatch) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', UPLOAD_PRESET);
  delete axios.defaults.headers.common.Authorization;

  return axios.post(CLOUDINARY_API, data)
    .then((res) => {
      const { accessToken } = localStorage;
      setAuthToken(accessToken);
      const imageUrl = res.data.secure_url;
      dispatch(setImage(imageUrl));
      const showImage = document.getElementById('show-image');
      document.getElementById('dropzone', 'upload-info').classList.add('hide');
      document.getElementById('upload-info').classList.remove('hide');
      showImage.classList.remove('hide');
      showImage.src = res.data.secure_url;
      toastr.info('Click upload button to finish');
    });// eslint-disable-line no-unused-vars
};
/**
 * @description function to dispatch an action to filter recipes
 *
 * @param {any} businessId
 *
 * @param {any} image
 *
 * @return {Object} action dispatched by the action creator
 */
const businessImageUploader = (businessId, image) => dispatch => axios.put(`/api/v1/business/${businessId}/image`, image)
  .then((res) => {
    const { business } = res.data;
    dispatch(setBusinessById(business));
    toastr.success('Image uploaded successfully');
  }); // eslint-disable-line no-unused-vars

export {
  // imageUploader,
  businessImageUploader,
  uploadToCloudinary
};
