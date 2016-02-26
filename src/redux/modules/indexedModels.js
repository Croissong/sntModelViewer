// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_INDEXEDMODELS = 'REQUEST_INDEXEDMODELS';
function requestIndexedModels (id) {
  return {
    type: REQUEST_INDEXEDMODELS,
    id
  };
}

const RECEIVE_INDEXEDMODELS = 'RECEIVE_INDEXEDMODELS';
function receiveIndexedModels (id, models) {
  return {
    type: RECEIVE_INDEXEDMODELS,
    id,
    models,
    receivedA: new Date().toLocaleString()
  };
}

export function fetchIndexedModels (id) {
  return function (dispatch) {
    dispatch(requestIndexedModels(id));
    return fetch('http://localhost:3005/models/' + id)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveIndexedModels(id, json))
       );
  };
}

export const actions = {
  requestIndexedModels
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_INDEXEDMODELS]: (state, action) => state,
  [RECEIVE_INDEXEDMODELS]: (state, action) => ({ ...state, models: action.models })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function indexedModelsReducer (state = [], action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
