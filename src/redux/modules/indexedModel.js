import { mapById } from 'redux/utils/modelUtils';
import i from 'icepick';

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
// [ACTION]: (state, action) => ...
// ------------------------------------

const ACTION_HANDLERS = {
  [SELECT_INDEXEDMODEL]: (s, a) => i.assocIn(s, ['selected', a.modelDef], a.id),
  [REQUEST_INDEXEDMODELS]: (s, a) => i.updateIn(s, ['fetching'], (arr) => i.push(arr, a.modelDef)),
  [RECEIVE_INDEXEDMODELS]: (s, a) => i.chain(s)
                                      .updateIn('fetching',
                                                (arr) => arr.filter(e => (e !== a.modelDef)))
                                      .assoc('a.modelDef', mapById(a.models, a.modelDef))
};

const initialState = {
  selected: { ModelDef1: 1 },
  fetching: [],
  ModelDef1: {
    1: {
      'modelDef': 'ModelDef1',
      'id': 1,
      'name': 'Model1',
      'indexedField': 18
    },
    2: {
      'modelDef': 'ModelDef1',
      'id': 2,
      'name': 'Model2',
      'indexedField': 19
    },
    3: {
      'modelDef': 'ModelDef1',
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
