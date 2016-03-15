import { combineReducers } from 'redux-immutable';
import router from './routerReducer';
import model from './modules/model';
import modelDefs from './modules/modelDefs';
import editor from './modules/editor';

export default combineReducers({
  modelDef: modelDefs,
  model: model,
  editor: editor,
  router: router
});
