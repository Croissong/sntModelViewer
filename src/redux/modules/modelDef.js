import Immutable from 'immutable';
import {createAction, createReducer} from 'redux-act';

export const selecModelDef = createAction('select model definition with [id]');

const selectModelDefHandler = (state, id) => {
  return state.set('selected', id);
}

export const requestModelDefs = createAction('request all model definitions');

const requestModelDefsHandler = () => {
  return s.set('fetching', true);
};

export const receiveModelDefs = createAction('receive model definitions',
                                             modelDefs => modelDefs,
                                             (_) => ({receivedAt: new Date().toLocaleString()}));

const receiveModelDefsHandler = (state, modelDefs) => {
  return state.set('fetching', false)
              .set('entities', Immutable.fromJS(a.modelDefs));
};

export default createReducer({
  [selectModelDef]: (state, payload) => selectModelDefHandler(state, payload),
  [requestModelDefs]: (_, __) => requestModelDefsHandler(),
  [receiveModelDefs]: (state, payload) => receiveModelDefsHandler(state, payload)
}, initialState);

const initialState = Immutable.fromJS({
  selected: 'ModelDef1',
  entities: ['ModelDef1', 'ModelDef2', 'ModelDef3']
});


  
