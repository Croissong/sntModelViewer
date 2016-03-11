import { combineReducers } from 'redux-immutable';
import { routerReducer as router } from 'react-router-redux';
import model from './modules/model';
import indexedModel from './modules/indexedModel';
import modelDefs from './modules/modelDefs';
import editor from './modules/editor';

export default combineReducers({
  modelDefs,
  indexedModel,
  model,
  editor,
  router
});
