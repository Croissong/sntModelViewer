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
         dispatch(receiveIndexedModels(modelDef, json.fields))
       );
  };
}

const mapById = (modelDef, models, nestedKey) => models.reduce((obj, m) => {
  obj[m.id] = {modelDef: modelDef, [nestedKey]: m};
  return obj;
}, {});

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------
export const handlers = {
  [SELECT_INDEXEDMODEL]: (s, a) => i.assocIn(s, ['selected', a.modelDef], a.id),
  [REQUEST_INDEXEDMODELS]: (s, a) => i.assocIn(s, [a.modelDef, 'indexed_fetching'], true),
  [RECEIVE_INDEXEDMODELS]: (s, a) => i.chain(s)
                                      .updateIn([a.modelDef], val => i.dissoc(val, 'indexed_fetching'))
                                      .updateIn([a.modelDef], val =>
                                        i.merge(val, mapById(a.modelDef, a.models, 'indexed_fields')))
                                      .value()
};

