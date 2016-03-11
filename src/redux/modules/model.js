import { handlers as index_handlers } from './indexedModel';

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

export function fetchModel (modelDef, id, action) {
  return function (dispatch) {
    dispatch(requestModel(modelDef, id));
    return fetch('http://localhost:3005/models/' + modelDef + '_' + id)
       .then(response => response.json())
       .then(json => {
         dispatch(receiveModel(modelDef, id, json.fields));
         if (action) dispatch(action(modelDef, id, json.fields));
       });
  };
}

export const actions = {
};

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------

const ACTION_HANDLERS = {
  [REQUEST_MODEL]: (s, a) => s.setIn([a.modelDef, a.id, 'fetching'], true),
  [RECEIVE_MODEL]: (s, a) => s.toSeq()
                              .deleteIn([a.modelDef, a.id], 'fetching')
                              .setIn([a.modelDef, a.id, 'fields'], a.model),
  ...index_handlers
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  ModelDef1: {
    1: {
      modelDef: 'ModelDef1',
      indexed_fields: {
        'id': 1,
        'name': 'Model1',
        'indexedField': 18
      }
    },
    2: {
      modelDef: 'ModelDef1',
      indexed_fields: {
        'id': 2,
        'name': 'Model2',
        'indexedField': 19
      }
    },
    3: {
      modelDef: 'ModelDef1',
      indexed_fields: {
        'id': 3,
        'name': 'Model3',
        'indexedField': 20
      }
    }
  }
};

export default function modelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
