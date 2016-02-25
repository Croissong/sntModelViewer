// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_MODELS = 'REQUEST_MODELS';
function requestModels (id) {
  return {
    type: REQUEST_MODELS,
    id
  };
}

const RECEIVE_MODELS = 'RECEIVE_MODELS';
function receiveModels (id, models) {
  return {
    type: RECEIVE_MODELS,
    id,
    models,
    receivedA: new Date().toLocaleString()
  };
}

export function fetchModels (id) {
  return function (dispatch) {
    dispatch(requestModels(id));
    return fetch('http://localhost:3005/models/' + id)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModels(id, json))
       );
  };
}

export const actions = {
  requestModels
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_MODELS]: (state, action) => state,
  [RECEIVE_MODELS]: (state, action) => action.models
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function modelsReducer (state = {id: '', models: []}, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
