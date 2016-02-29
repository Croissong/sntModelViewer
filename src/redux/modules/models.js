import { combineReducers } from 'redux';

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

const EDIT_MODEL = 'EDIT_MODEL';
function editModel (modelDef, id) {
  return {
    type: INDEX_MODEL,
    modelDef,
    id,
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
  editModel
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_MODEL]: (state, action) => ({ ...state, [action.modelDef]: { ...state[action.modelDef], [action.id]:  }fetching: true }),
  [RECEIVE_MODEL]: (state, action) => ({
    fetching: false,
    models: { ...state.models, [action.def]: action.model }
  }),
  [EDIT_MODEL]: (state, action) => ({ ...state, fetching: true }),
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  edit: {},
  models: {
    1_1: {
      'id': 1,
      'name': 'Model1',
      'indexedField': 18
    },
    1_2: {
      'id': 2,
      'name': 'Model2',
      'indexedField': 19
    },
    1_3: {
      'id': 3,
      'name': 'Model3',
      'indexedField': 20
    }
  }
}
};

indexedModelReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

modelReducer = (state = { 1: {} }, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export default combineReducers({
  modelDefs,
  models,
  router
});
