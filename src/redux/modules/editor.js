// ------------------------------------
// Actions
// ------------------------------------

const REQUEST_MODEL = 'REQUEST_MODEL';
function requestModel () {
  return {
    type: REQUEST_MODEL
  };
}
const RECEIVE_MODEL = 'RECEIVE_MODEL';
function receiveModel (model) {
  return {
    type: RECEIVE_MODEL,
    model,
    receivedA: new Date().toLocaleString()
  };
}


const EDIT_MODEL = 'EDIT_MODEL';
function editModel (id) {
  return {
    type: SELECT_MODELDEF,
    id
  };
}

export function fetchModel () {
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
  editModel
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [EDIT_MODEL]: (state, action) => ({ ...state, selected: action.id }),
  [RECEIVE_MODEL]: (state, action) => ({ ...state, model: action.model }) 
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function modeldefsReducer (state = { selected: '', model: {} }, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
