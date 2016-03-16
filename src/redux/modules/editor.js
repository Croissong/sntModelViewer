import { actionTypes as formActions } from 'react-redux-form';
import Immutable from 'immutable';
import { RECEIVE_MODEL } from './model';
import Validator from 'jsonschema';

// ------------------------------------
// Actions
// ------------------------------------
const EDIT_MODEL = 'EDIT_MODEL';
function editModel (id, model) {
  return {
    type: EDIT_MODEL,
    id,
    model
  };
}

const RESET_MODEL = 'RESET_MODEL';
function resetModel (_, model) {
  return {
    type: RESET_MODEL,
    model
  };
}

const SAVING_MODEL = 'SAVING_MODEL';
function savingModel (model) {
  return {
    type: SAVING_MODEL,
    model
  };
}

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

export function saveModel (model) {
  return function (dispatch) {
    let body = JSON.stringify({id: model.get('id'), fields: model.get('fields')});
    dispatch(savingModel(model));
    return fetch(
      'http://localhost:3005/models/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }
    ).then(response => response.json())
     .then(json => {
       dispatch(savedModel(model));
     });
  };
}

const getParser = (model) => (
  model.entrySeq().reduce((parsers, [key, value]) => {
    let pattern = typeof value === 'object' ? value.getIn(['validator', 'pattern']) : false;
    if (pattern) {
      let regex = new RegExp('^[\' + pattern + ']', 'g');
      parsers[key] = (val) => {
        let x = val.replace(regex, '');
        return x;
      };
    } else {
      parsers[key] = (_) => {};
    }
    return parsers;
  }, {})
);

const getValidator = (model) => (
  model.entrySeq().reduce((validators, [key, value]) => {
    let schema = typeof value === 'object' ? value.get('validator') : false;
    if (schema) {
      validators[key] = (val) => Validator.validate(val, schema);
    } else {
      validators[key] = (_) => {};
    }
    return validators;
  }, {})
);

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_MODEL]: (s, a) => s.set('active', true)
                           .set('modelId', a.id)
                           .set('editedFields', a.model),
  [formActions.CHANGE]: (s, a) => s.setIn(['editedFields', a.model], a.value),
  [RESET_MODEL]: (s, a) => s.set('editedFields', a.model),
  [SAVING_MODEL]: (s, a) => s.set('saving', true),
  [SAVED_MODEL]: (s, a) => s.delete('saving'),
  [RECEIVE_MODEL]: (s, a) => s.mergeIn(['parsers', a.id], getParser(a.model))
                              .mergeIn(['validators', a.id], getValidator(a.model))
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
