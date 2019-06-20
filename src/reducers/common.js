import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  SETTINGS_SAVED,
  LOGIN,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  USER,
  GET_EVENTS
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Steffes TV',
  token: null,
  viewChangeCounter: 0,
  events: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload : null,
        events: action.events ? action.events : []
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    case LOGIN:
    return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.access_token,
      }
    case USER:
      return{
        ...state,
        currentUser: action.error ? null : action.payload
      }
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case GET_EVENTS:
      return{
        ...state,
        events: action.error ? null : action.payload
      }
    default:
      return state;
  }
};
