// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_MODELS = 'REQUEST_MODELS';
function requestModels () {
  return {
    type: REQUEST_MODELS
  };
}

const RECEIVE_MODELS = 'RECEIVE_MODELS';
function receiveModels (models) {
  return {
    type: RECEIVE_MODELS,
    models,
    receivedA: new Date().toLocaleString()
  };
}

export function fetchModels () {
  return function (dispatch) {
    dispatch(requestModels());
    return fetch('http://localhost:3005/models')
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModels(json))
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
export default function modelsReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
