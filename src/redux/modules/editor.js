import {actionTypes as formActions} from 'react-redux-form';
import Immutable from 'immutable';
import {receiveFields} from './model';
import {getValidator, getParser} from '../utils/validator';
import {createAction, createReducer} from 'redux-act';

export const editModel = createAction('edit [fields] of model with [id]',
                                      (id, model) => ({id, model}));

const editModelHandler = (state, id, fields) => {
  return state.set('active', true)
              .set('modelId', id)
              .set('editedFields', fields);
};

export const resetModel = createAction('reset fields to [fields]');

const resetModelHandler = (state, fields) => {
  return state.set('editedFields', fields);
};

export const savingModel = createAction('changed model is currently being saved');

const savingModelHandler = (state) => {
  return state.set('saving', true);
};

export const savedModel = createAction('[model] has been successfully saveed');

const savedModelHandler = (state) => {
  return state.delete('saving');
};

// export const validateField = createAction('validate [field] with validation schema [schema]');

const setValidityHandler = (state, field, validity) => {
  if (!validity.valid) {
    return state.setIn(['errors', field], validity.errors);
  } else {
    return state.deleteIn(['errors', field]);
  }
};

const fieldChangeHandler = (state, field, value) => {
  return state.setIn(['editedFields', field], value);
};

const receiveFieldsHandler = (state, id, fields) => {
  return state.mergeIn(['parsers', id], getParser(fields))
              .mergeIn(['validators', id], getValidator(fields));
};

const initialState = Immutable.fromJS({
  active: false
});

export default createReducer({
  [editModel]: (state, payload) => editModelHandler(state, payload.id, payload.model),
  [resetModel]: (state, payload) => resetModelHandler(state, payload),
  [savingModel]: (state, _) => savingModelHandler(state),
  [savedModel]: (state, _) => savedModelHandler(state),
  [receiveFields]: (state, payload) => receiveFieldsHandler(state, payload.id, payload.fields),
  [formActions.CHANGE]: (state, action) => fieldChangeHandler(state, action.model, action.value),
  [formActions.SET_VALIDITY]: (state, action) => {
    console.log(action);
    return state;
  }
}, initialState);
