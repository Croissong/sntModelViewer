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
function selectIndexModel (id) {
  return {
    type: SELECT_INDEXEDMODEL,
    id
  };
}

export const actions = {
  selectIndexModel
};

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

const mapModels = (modelDef, model) => {
  models.reduce( obj = {}, m => {
    let id = modelDef + '_' + m.id;
    obj[id] = m;
  })
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SELECT_INDEXEDMODEL]: (state, action) => (
    { ...state, selected: action.id }
  ),
  [REQUEST_INDEXEDMODELS]: (state, action) => (
    { ...state, fetching: state.fetching.push(action.modelDef) }
  ),
  [RECEIVE_INDEXEDMODELS]: (state, action) => {
    let models = mapModels(action.modelDef, action.models);
    let modelDefs = { ...state.modelDefs, [action.modelDef]: Object.keys(models)};
    models = { ...state.models, ...models};
    return {
      ...state, fetching: state.fetching.pop(action.modelDef),
      models: models, modelDefs: modelDefs
    }
  }
};

const initialState = {
  selected: "ModelDef1_1",
  fetching: [],
  modelDefs: {
    ModelDef1: ["ModelDef1_1", "ModelDef1_2" "ModelDef1_3"]
  }
  models: {
    ModelDef1_1: {
      'id': 1,
      'name': 'Model1',
      'indexedField': 18
    },
    ModelDef1_2: {
      'id': 2,
      'name': 'Model2',
      'indexedField': 19
    },
    ModelDef1_3: {
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
