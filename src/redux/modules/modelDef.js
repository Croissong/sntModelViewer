import Immutable from 'immutable';
import {createAction, createReducer} from 'redux-act';

export const selectModelDef = createAction('select model definition with [id]');

const selectModelDefHandler = (state, id) => {
  return state.set('selected', id);
};

export const requestModelDefs = createAction('request all model definitions');

const requestModelDefsHandler = (state) => {
  return state.set('fetching', true);
};

export const receiveModelDefs = createAction('receive model definitions',
                                             modelDefs => modelDefs,
                                             (_) => ({receivedAt: new Date().toLocaleString()}));

const receiveModelDefsHandler = (state, modelDefs) => {
  return state.set('fetching', false)
              .set('entities', Immutable.fromJS(modelDefs));
};

const initialState = Immutable.fromJS({
  selected: 'ModelDef1',
  entities: ['ModelDef1', 'ModelDef2', 'ModelDef3']
});

export default createReducer({
  [selectModelDef]: (state, payload) => selectModelDefHandler(state, payload),
  [requestModelDefs]: (state, _) => requestModelDefsHandler(state),
  [receiveModelDefs]: (state, payload) => receiveModelDefsHandler(state, payload)
}, initialState);

