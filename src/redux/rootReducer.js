import { combineReducers } from 'redux-immutable';
import router from './routerReducer';
import model from './modules/model';
import modelDef from './modules/modelDef';
import editor from './modules/editor';

export default combineReducers({
  modelDef: modelDef,
  model: model,
  editor: editor,
  router: router
});
