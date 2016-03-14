import { actionTypes } from 'react-redux-form';
import Immutable from 'immutable';

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
function resetModel (_, __, model) {
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

export const actions = {
  editModel,
  resetModel,
  savingModel,
  savedModel
};

export function saveModel (model) {
  return function (dispatch) {
    let id = model.modelDef + '_' + model.fields.id;
    let fields = model.fields;
    let body = JSON.stringify({id: id, fields: fields});
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

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_MODEL]: (s, a) => s.set('active', true)
                           .set('modelId', a.id)
                           .set('editedModel', Immutable.fromJS(a.model)),
  [actionTypes.CHANGE]: (s, a) => s.mergeIn(['editedModel', a.model], a.value),
  [RESET_MODEL]: (s, a) => s.set('editedModel', Immutable.fromJS(a.model)),
  [SAVING_MODEL]: (s, a) => s.set('saving', true),
  [SAVED_MODEL]: (s, a) => s.delete('saving')
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
