// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_MODELDEFS = 'REQUEST_MODELDEFS';
function requestModeldefs () {
  return {
    type: REQUEST_MODELDEFS
  };
}

const RECEIVE_MODELDEFS = 'RECEIVE_MODELDEFS';
function receiveModeldefs (defs) {
  return {
    type: RECEIVE_MODELDEFS,
    defs,
    receivedA: new Date().toLocaleString()
  };
}

const SELECT_MODELDEF = 'SELECT_MODELDEF';
function selectModeldef (id) {
  return {
    type: SELECT_MODELDEF,
    id
  };
}

export function fetchModeldefs () {
  return function (dispatch) {
    dispatch(requestModeldefs());
    return fetch('http://localhost:3005/modeldefs')
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModeldefs(json))
       );
  };
}

export const actions = {
  selectModeldef
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SELECT_MODELDEF]: (state, action) => ({ selected: action.id, ...state }),
  [RECEIVE_MODELDEFS]: (state, action) => ({ ...state, defs: action.defs })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function modeldefsReducer (state = { selected: '', defs: [] }, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
