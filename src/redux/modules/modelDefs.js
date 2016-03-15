import Immutable from 'immutable';

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
function receive (modelDefs) {
  return {
    type: RECEIVE_MODELDEFS,
    modelDefs,
    receivedA: new Date().toLocaleString()
  };
}

const SELECT_MODELDEF = 'SELECT_MODELDEF';
function selectModelDef (id) {
  return {
    type: SELECT_MODELDEF,
    id
  };
}

export function fetchModelDefs () {
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
  selectModelDef
};

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------

const ACTION_HANDLERS = {
  [SELECT_MODELDEF]: (s, a) => s.set('selected', a.id),
  [REQUEST_MODELDEFS]: (s, a) => s.set('fetching', true),
  [RECEIVE_MODELDEFS]: (s, a) => s.set('fetching', false)
                                  .set('modelDefs', Immutable.fromJS(a.modelDefs))
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  selected: 'ModelDef1',
  modelDefs: ['ModelDef1', 'ModelDef2', 'ModelDef3']
});

export default function modelDefsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
