// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_MODELDEFS = 'REQUEST_MODELDEFS';
function request () {
  return {
    type: REQUEST_MODELDEFS
  };
}
const RECEIVE_MODELDEFS = 'RECEIVE_MODELDEFS';
function receive (defs) {
  return {
    type: RECEIVE_MODELDEFS,
    defs,
    receivedA: new Date().toLocaleString()
  };
}

const SELECT_MODELDEF = 'SELECT_MODELDEF';
function select (id) {
  return {
    type: SELECT_MODELDEF,
    id
  };
}

export function fetchModeldefs () {
  return function (dispatch) {
    dispatch(request());
    return fetch('http://localhost:3005/modeldefs')
       .then(response => response.json())
       .then(json =>
         dispatch(receive(json))
       );
  };
}

export const actions = {
  select
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SELECT_MODELDEF]: (state, action) => ({ ...state, selected: action.id }),
  [REQUEST_MODELDEFS]: (state, action) => ({ ...state, fetching: true}),
  [RECEIVE_MODELDEFS]: (state, action) => (
    { ...state, fetching: false, modelDefs: action.defs }
  )
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selected: 1,
  fetching: false,
  modelDefs: ["ModelDef1", "ModelDef2", "ModelDef3"]
};

export default modeldefSelectionReducer = (state = initalState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
