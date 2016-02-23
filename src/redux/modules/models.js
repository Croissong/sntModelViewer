/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_MODELS = 'FETCH_MODELS';
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
export const fetchModels = () => ({
  type: FETCH_MODELS
});

export const actions = {
  fetchModels
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_MODELS]: (state, action) => {
    fetch(url, myInit)
       .then((response) => {
         return response.json();
       }).then((json) => {
         json = JSON.stringify(json);
         console.log(json);
         return json;
       });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
