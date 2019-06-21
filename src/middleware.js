import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  USER,
  GET_EVENTS
} from './constants/actionTypes';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    console.log(action);
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }
  else if (isPromise(action.events)) {
    console.log(action);
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.events.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.events = res;
        store.dispatch({ type: ASYNC_END, promise: action.events });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.events = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.events });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('token', action.payload.access_token);
      window.localStorage.setItem('email', store.getState().auth.email);
      window.localStorage.setItem('pass', store.getState().auth.password);
      agent.setToken(action.payload.access_token);
      store.dispatch({type: USER, payload: agent.Auth.user(store.getState().auth.email)})
      store.dispatch({type: GET_EVENTS, payload: agent.Calendar.accepted()})
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('email', '');
    agent.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
