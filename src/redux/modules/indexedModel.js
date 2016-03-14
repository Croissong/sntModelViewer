import Immutable from 'immutable';
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
function selectIndexedModel (id) {
  return {
    type: SELECT_INDEXEDMODEL,
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
         dispatch(receiveIndexedModels(modelDef, json.fields))
       );
  };
}

const mapById = (modelDef, models) => models.reduce((obj, m) => {
  let id = modelDef + '_' + m.id;
  obj[id] = {
    id: id,
    modelDef: modelDef,
    indexed_fields: m
  };
  return obj;
}, {});

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------
export const handlers = {
  [SELECT_INDEXEDMODEL]: (s, a) => s.setIn(['selected', s.getIn('modelDefs', 'selected')], a.id),
  [REQUEST_INDEXEDMODELS]: (s, a) => s.update('fetching_indexed', val => val.push(a.modelDef)),
  [RECEIVE_INDEXEDMODELS]: (s, a) => {
    let models = mapById(a.modelDef, a.models);
    return s.update('fetching_indexed', val => val.filter(mD => mD !== a.modelDef))
            .set(a.modelDef, Immutable.List.of(...Object.keys(models)))
            .mergeDeepIn(['models'], models);
  }
};

