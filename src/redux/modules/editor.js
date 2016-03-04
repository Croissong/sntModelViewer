import { combineReducers } from 'redux';
import { createModelReducer, createFormReducer } from 'react-redux-form';

// ------------------------------------
// Actions
// ------------------------------------
const EDIT_MODEL = 'EDIT_MODEL';
function editModel (model) {
  return {
    type: EDIT_MODEL,
    model
  };
}

const EDIT_FIELD = 'EDIT_FIELD';
function editFIELD (field, value) {
  return {
    type: EDIT_FIELD,
    field,
    value
  };
}

export const actions = {
  editModel,
  editFIELD
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_MODEL]: (state, action) => ({ ...state, active: true,
                                      model: {modelDef: action.model.modelDef, id: action.model.id},
                                      editedModel: action.model}),
  [EDIT_FIELD]: (state, action) => ({ ...state,
                                      editedModel: {
                                        ...state.editedModel,
                                        [action.field]: action.value
                                      }
  })
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  active: false,
  model: {}
};

function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

console.log(createModelReducer('editedModel'));
export default combineReducers({
  editor: editorReducer,
  editedModel: createModelReducer('editedModel'),
  editorForm: createFormReducer('editedModel')
});
