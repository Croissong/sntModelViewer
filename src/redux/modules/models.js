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

export function fetchIndexedModels (modelDef) {
  return function (dispatch) {
    dispatch(requestIndexedModels(modelDef));
    return fetch('http://localhost:3005/models/' + modelDef)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveIndexedModels(modelDef, json))
       );
  };
}

const REQUEST_MODEL = 'REQUEST_MODEL';
function requestModel (id) {
  return {
    type: REQUEST_MODEL
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

export function fetchModel (id) {
  return function (dispatch) {
    dispatch(requestModel(id));
    return fetch('http://localhost:3005/modeldefs')
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModel(json))
       );
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [REQUEST_MODEL]: (state, action) => ({ ...state, fetching: true }),
  [RECEIVE_MODEL]: (state, action) => ({
    fetching: false,
    modelsById: { ...state.modelsById, action.id: action.model }
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function modeldefsReducer (state = { fetching: false, model: [], action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}


  export const actions = {
    selectModel
  };

  // ------------------------------------
  // Action Handlers
  // ------------------------------------

  mapModels = (modelsByDef, modelDef, models) => ({ ...modelsByDef, })

    const ACTION_HANDLERS = {
      [SELECT_INDEXEDMODEL]: (state, action) => ({ ...state, selected: action.id }),
      [REQUEST_INDEXEDMODELS]: (state, action) => ({ ...state, fetching: true }),
      [RECEIVE_INDEXEDMODELS]: (state, action) => (
        { ...state, fetching: false,
          modelsByDef: mapModels(state.modelsByDef, action.modelDef, action.models)
        }
      ),
    };

  // ------------------------------------
  // Reducer
  // ------------------------------------

  const initialState = {
    selected: 1,
    modelsByDef: {
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
    }
  };

  export default indexedModelsReducer = (state = initalstate, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
  }
