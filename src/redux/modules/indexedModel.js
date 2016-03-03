import { mapById } from 'redux/utils/modelUtils';

// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_INDEXEDMODELS = 'REQUEST_INDEXEDMODELS';
function requestIndexedModels (modelDef) {
  return {
    type: REQUEST_INDEXEDMODELS,
    modelDef
  };
}

const RECEIVE_INDEXEDMODELS = 'RECEIVE_INDEXEDMODELS';
function receiveIndexedModels (modelDef, models) {
  return {
    type: RECEIVE_INDEXEDMODELS,
    modelDef,
    models,
    receivedA: new Date().toLocaleString()
  };
}

const SELECT_INDEXEDMODEL = 'SELECT_INDEXEDMODEL';
function selectIndexedModel (modelDef, id) {
  return {
    type: SELECT_INDEXEDMODEL,
    modelDef,
    id
  };
}

export const actions = {
  selectIndexedModel
};

export function fetchIndexedModels (modelDef) {
  return function (dispatch) {
    dispatch(requestIndexedModels(modelDef));
    return fetch('http://localhost:3005/indexedModels/' + modelDef)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveIndexedModels(modelDef, json.models))
       );
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SELECT_INDEXEDMODEL]: (state, action) => (
    { ...state, selected: { ...state.selected, [action.modelDef]: action.id } }
  ),
  [REQUEST_INDEXEDMODELS]: (state, action) => (
    { ...state, fetching: [action.modelDef].concat(...state.fetching) }
  ),
  [RECEIVE_INDEXEDMODELS]: (state, action) => (
    { ...state,
      fetching: state.fetching.filter(e => (e !== action.modelDef)),
      [action.modelDef]: mapById(action.models)
    })
};

const initialState = {
  selected: { ModelDef1: 1 },
  fetching: [],
  ModelDef1: {
    1: {
      'id': 1,
      'name': 'Model1',
      'indexedField': 18
    },
    2: {
      'id': 2,
      'name': 'Model2',
      'indexedField': 19
    },
    3: {
      'id': 3,
      'name': 'Model3',
      'indexedField': 20
    }
  }
};

export default function indexedModelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
