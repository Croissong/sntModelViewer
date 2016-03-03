// ------------------------------------
// Actions
// ------------------------------------
const EDIT_MODEL = 'EDIT_MODEL';
function editModel (modelDef, id) {
  return {
    type: EDIT_MODEL,
    modelDef,
    id
  };
}

export const actions = {
  editModel
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_MODEL]: (state, action) => ({ ...state, active: true,
                                      model: { modelDef: action.modelDef, id: action.id } })
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  active: false,
  model: {}
};

export default function editorReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
