import { handlers as index_handlers } from './indexedModel';
import Immutable from 'immutable';

// ------------------------------------
// Actions
// ------------------------------------
const REQUEST_MODEL = 'REQUEST_MODEL';
function requestModel (id) {
  return {
    type: REQUEST_MODEL,
    id
  };
}

const RECEIVE_MODEL = 'RECEIVE_MODEL';
function receiveModel (id, model) {
  return {
    type: RECEIVE_MODEL,
    id,
    model,
    receivedA: new Date().toLocaleString()
  };
}

export function fetchModel (id, action) {
  return function (dispatch) {
    dispatch(requestModel(id));
    return fetch('http://localhost:3005/models/' + id)
       .then(response => response.json())
       .then(json => {
         dispatch(receiveModel(id, json.fields));
         if (action) dispatch(action(id, json.fields));
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
  [REQUEST_MODEL]: (s, a) => s.update('fetching', list => list.push(a.id)),
  [RECEIVE_MODEL]: (s, a) => s.setIn(['models', a.id, 'fields'], Immutable.Map(a.model))
                              .update('fetching', list => list.filter(id => id !== a.id)),
  ...index_handlers
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  fetching_indexed: Immutable.List(),
  fetching: Immutable.List(),
  ModelDef1: Immutable.List.of('ModelDef1_1', 'ModelDef1_2', 'ModelDef1_3'),
  models: {
    ModelDef1_1: {
      id: 'ModelDef1_1',
      modelDef: 'ModelDef1',
      indexed_fields: {
        'id': '1',
        'name': 'Model1',
        'indexedField': 18
      }
    },
    ModelDef1_2: {
      id: 'ModelDef1_2',
      modelDef: 'ModelDef1',
      indexed_fields: {
        'id': '2',
        'name': 'Model2',
        'indexedField': 19
      }
    },
    ModelDef1_3: {
      id: 'ModelDef1_3',
      modelDef: 'ModelDef1',
      indexed_fields: {
        'id': '3',
        'name': 'Model3',
        'indexedField': 20
      }
    }
  }
});

export default function modelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
