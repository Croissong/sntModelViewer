import index_handlers from './indexedFields';
import Immutable from 'immutable';
import {createAction, createReducer} from 'redux-act';


export const requestFields = createAction('request fields for model with [id]');

const requestFieldsHandler = (state, id) => {
  return state.update('fetching', list => list.push(id)),
}

export const receiveFields = createAction('receive fields model with [id]',
                                          (modelDef, fields) => ({modelDef, fields}),
                                          (_) => ({receivedAt: new Date().toLocaleString()}));

const receiveFieldsHandler = (state, id, fields) => {
  state.setIn(['models', id, 'fields'], fields)
       .update('fetching', list => list.filter(id => id !== id)),
}

export default createReducer({
  [requestFields]: (state, payload) => requestFieldsHandler(state, payload),
  [receiveFields]: (state, payload) => receiveFieldsHandler(state, payload.modelDef, payload.fields),
  ...index_handlers
}, initialState);

const initialState = Immutable.fromJS({
  fetching_indexed: [],
  fetching: [],
  ModelDef1: ['ModelDef1_1', 'ModelDef1_2', 'ModelDef1_3'],
  indexedFields: {
    ModelDef1_1: {
      'id': '1',
      'name': 'Model1',
      'indexedField': 18
    },
    ModelDef1_2: {
      'id': '2',
      'name': 'Model2',
      'indexedField': 19
    },
    ModelDef1_3: {
      'id': '3',
      'name': 'Model3',
      'indexedField': 20
    }
  }
});
