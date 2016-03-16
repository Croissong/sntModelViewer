import Immutable from 'immutable';
import {createAction} from 'redux-act';

export const selectModel = createAction('select models with [id]');
const selectModelHandler = (state, id) => {
  let modelDef = state.getIn('modelDefs', 'selected');
  return state.setIn(['selected', modelDef], id);
}
  

export const requestIndexedFields = createAction('request indexed fields for all models of [modelDef]');
const requestIndexedFieldsHander = (state, modelDef) =>
  state.update('index_fetching', list => list.push(modelDef));

export const receiveIndexedFields = createAction('receive indexed fields for all models of [modelDef]',
                                                 (modelDef, models) => ({modelDef, models}),
                                                 (_) => ({receivedAt: new Date().toLocaleString()}));


const mapById = (modelDef, models) => models.reduce((obj, m) => {
  let id = modelDef + '_' + m.id;
  obj[id] = {
    id: id,
    modelDef: modelDef,
    indexed_fields: m
  };
  return obj;
}, {});


export const handlers = {
  selectModel: (s, a) => s.setIn(['selected', s.getIn('modelDefs', 'selected')], a.id),
  requestIndexedFields: (state, payload) => requestIndexedFieldsHandler(state, payload),
  receiveIndexedFields: (s, a) => receiveIndexedFields()
};

{
  let models = mapById(a.modelDef, a.models);
  return s.update('fetching_indexed', val => val.filter(mD => mD !== a.modelDef))
          .set(a.modelDef, Immutable.List.of(...Object.keys(models)))
          .mergeDeepIn(['models'], models);
}
