import { mapById } from 'redux/utils/modelUtils';
// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_MODEL = 'REQUEST_MODEL';
function requestModel (modelDef, id) {
  return {
    type: REQUEST_MODEL,
    modelDef,
    id
  };
}

const RECEIVE_MODEL = 'RECEIVE_MODEL';
function receiveModel (modelDef, id, model) {
  return {
    type: RECEIVE_MODEL,
    modelDef,
    id,
    model,
    receivedA: new Date().toLocaleString()
  };
}

export function fetchModel (modelDef, id) {
  return function (dispatch) {
    dispatch(requestModel(modelDef, id));
    return fetch('http://localhost:3005/modeldefs')
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModel(modelDef, id, json))
       );
  };
}

export const actions = {
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_MODEL]: (state, action) => {
    let md = action.modelDef;
    return { ...state, fetching: { ...state.fetching, [md]: state.fetching.md.push(action.id) } };
  },
  [RECEIVE_MODEL]: (state, action) => {
    let md = action.modelDef;
    return {
      ...state,
      fetching: { ...state.fetching, [md]: state.fetching.md.pop(action.id) },
      md: mapById(action.models)
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  fetching: {}
};

export default function modelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
