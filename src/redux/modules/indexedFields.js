import Immutable from 'immutable';
import {createAction} from 'redux-act';

export const selectModel = createAction('select model with [id]');

const selectModelHandler = (state, id) => {
  let modelDef = state.getIn('modelDefs', 'selected');
  return state.setIn(['selected', modelDef], id);
};

export const requestIndexedFields = createAction('request indexed fields for all models of [modelDef]');

const requestIndexedFieldsHandler = (state, modelDef) => {
  let x = state;
  return state.update('fetching_indexed', list => list.push(modelDef));
};

export const receiveIndexedFields = createAction('receive indexed fields for all models of [modelDef]',
                                                 (modelDef, fields) => ({modelDef, fields}),
                                                 (_) => ({receivedAt: new Date().toLocaleString()}));

const receiveIndexedFieldsHandler = (state, modelDef, fields) => {
  let models = mapById(modelDef, models);
  return state.update('fetching_indexed', val => val.filter(mD => mD !== modelDef))
              .set(modelDef, Immutable.List.of(...Object.keys(models)))
              .mergeDeepIn(['models'], models);
};

export default {
  [selectModel]: (state, payload) => selectModelHandler(state, payload),
  [requestIndexedFields]: (state, payload) => requestIndexedFieldsHandler(state, payload),
  [receiveIndexedFields]: (state, payload) => receiveIndexedFieldsHandler(state,
                                                                          payload.modelDef,
                                                                          payload.fields)
};

const mapById = (modelDef, models) => models.reduce((obj, m) => {
  let id = modelDef + '_' + m.id;
  obj[id] = {
    id: id,
    modelDef: modelDef,
    indexed_fields: m
  };
  return obj;
}, {});
