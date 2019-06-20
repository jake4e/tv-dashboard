import axios from 'axios';
let qs = require('qs');

const API_ROOT = 'https://steffes-analytics.azurewebsites.net/api';

const encode = encodeURIComponent;
const responseBody = res => res.data;
const errorBody = res =>  res;

let token = null;

const requests = {
  get: (url, headers) =>
      axios({
      method: 'get',
      url: `${API_ROOT}${url}`,
      headers: {
        Authorization: 'bearer ' + token,
        ...headers
      }
    })
    .then(responseBody)
    .catch(errorBody),
  put: (url, headers) =>
  axios({
    method: 'put',
    url: `${API_ROOT}${url}`,
    headers: {
      Authorization: 'bearer ' + token,
      ...headers
    }
  })
  .then(responseBody)
  .catch(errorBody),
  post: (url, headers) =>
  axios({
    method: 'post',
    url: `${API_ROOT}${url}`,
    headers: {
      Authorization: 'bearer ' + token,
      ...headers
    }
  })
  .then(responseBody)
  .catch(errorBody)
};

const Auth = {
  user: (email) =>
    requests.get('/user/get/email', {email: email}),
  login: (email, password) =>
    axios.post('https://steffes-analytics.azurewebsites.net/token', qs.stringify({username: email, password: password, grant_type: 'password'})).then(responseBody),
};

const Calendar = {
  accepted: () =>
    requests.get('/marketing/get/accepted')
}

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })

const Profile = {
  get: username =>
    requests.get(`/profiles/${username}`),
};

export default {
  Auth,
  Profile,
  Tags,
  Calendar,
  setToken: _token => { token = _token; }
};
