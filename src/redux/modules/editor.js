yimport { actionTypes as formActions } from 'react-redux-form';
import Immutable from 'immutable';
import { RECEIVE_MODEL } from './model';
import Validator from 'jsonschema';
import {createAction, createReducer} from 'redux-act';

export const editModel = createAction('edit [fields] of model with [id]',
                                      (id, model) => ({id, model}));

const editModelHandler = (state, id, fields) => {
  return state.set('active', true)
              .set('modelId', id)
              .set('editedFields', fields)
};

export const resetModel = createAction('reset fields to [fields]');

const resetModelHandler = (state, fields) => {
  return state.set('editedFields', fields); 
};

export const savingModel = createAction('changed model is currently being saved');

const savingModelHandler = (state) => {
  return state.set('saving', true);
};

const SAVED_MODEL = 'SAVED_MODEL';
function savedModel (model) {
  return {
    type: SAVED_MODEL,
    model
  };
}

const VALIDATE_FIELD = 'VALIDATE_FIELD';
function validateField (field, schema) {
  return {
    type: VALIDATE_FIELD,
    field,
    schema
  };
}

export const actions = {
  editModel,
  resetModel,
  savingModel,
  savedModel,
  validateField
};

const getParser = (model) => (
  model.entrySeq().reduce((parsers, [key, value]) => {
    let pattern = typeof value === 'object' ? value.getIn(['validator', 'pattern']) : false;
    if (pattern) {
      let regex = new RegExp(pattern);
      parsers[key] = (val) => (
        val.replace(new RegExp('((?:' + regex.source + ')+)|.', 'g'), (full, matched) => (
          (typeof matched !== 'undefined') ? matched : ''
        ))
      );
    } else {
      parsers[key] = (val) => (val);
    }
    return parsers;
  }, {})
);

const getValidator = (model) => (
  model.entrySeq().reduce((validators, [key, value]) => {
    let schema = typeof value === 'object' ? value.get('validator') : false;
    if (schema) {
      validators[key] = (val) => {
        return Validator.validate(val, schema.toJS());
      };
    } else {
      validators[key] = (_) => ({valid: true});
    }
    return validators;
  }, {})
);

const setValidity = (state, field, validity) => {
  if (!validity.valid) {
    state = state.setIn(['errors', field], validity.errors);
  }
  return state;
};

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_MODEL]: (s, a) => 
    [formActions.CHANGE]: (s, a) => s.setIn(['editedFields', a.model], a.value),
  [RESET_MODEL]: (s, a) => s.set('editedFields', a.model),
  [SAVING_MODEL]: (s, a) => s.set('saving', true),
  [SAVED_MODEL]: (s, a) => s.delete('saving'),
  [RECEIVE_MODEL]: (s, a) => s.mergeIn(['parsers', a.id], getParser(a.model))
                              .mergeIn(['validators', a.id], getValidator(a.model)),
  [formActions.SET_VALIDITY]: (s, a) => setValidity(s, a.model, a.validity.schema)
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  active: false
});

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
