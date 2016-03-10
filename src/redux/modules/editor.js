import { combineReducers } from 'redux';
import { createModelReducer, createFormReducer } from 'react-redux-form';
import i from 'icepick';

// ------------------------------------
// Actions
// ------------------------------------
const EDIT_MODEL = 'EDIT_MODEL';
function editModel (modelDef, id, model) {
  return {
    type: EDIT_MODEL,
    modelDef,
    id,
    model
  };
}

export const actions = {
  editModel
};

// ------------------------------------
// Action Handlers
// [ACTION]: (state, action) => ...
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_MODEL]: (s, a) => i.chain(s)
                           .assoc('active', true)
                           .assoc('model', {modelDef: a.modelDef, id: a.id})
                           .assoc('editedModel', a.model)
                           .value()
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  active: false
};

function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default combineReducers({
  editor: editorReducer,
  editedModel: createModelReducer('editor.editor.editedModel'),
  editorForm: createFormReducer('editor.editor.editedModel')
});
