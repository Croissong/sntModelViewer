import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import indexedModels from './modules/indexedModels';
import modelDefSelection from './modules/modelDefSelection';
import editor from './modules/editor';

export default combineReducers({
  modelDefSelection,
  indexedModels,
  editor,
  router
});
