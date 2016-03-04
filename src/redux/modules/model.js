import { mapById } from 'redux/utils/modelUtils';
import i from 'icepick';

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
    return fetch('http://localhost:3005/models/' + modelDef)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModel(modelDef, id, json.models))
       );
  };
}

export const actions = {
};

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------

const ACTION_HANDLERS = {
  [REQUEST_MODEL]: (s, a) => i.updateIn(s, ['fetching', a.modelDef], arr => i.push(arr, a.modelDef)),
  [RECEIVE_MODEL]: (s, a) => i.chain(s)
                              .updateIn(['fetching', a.modelDef], arr => arr.filter(e => e !== a.id))
                              .assocIn([a.modelDef, a.id], mapById(a.model, a.modelDef))
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  fetching: []
};

export default function modelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
