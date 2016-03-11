import { combineReducers } from 'redux-immutable';
import router from './routerReducer';
import model from './modules/model';
import indexedModel from './modules/indexedModel';
import modelDefs from './modules/modelDefs';
import editor from './modules/editor';

export default combineReducers({
  modelDefs: modelDefs,
  indexedModel: indexedModel,
  model: model,
  editor: editor,
  router: router
});
