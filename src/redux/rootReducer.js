import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import models from './modules/models';
import modelDefs from './modules/modelDefs';

export default combineReducers({
  modelDefs,
  models,
  router
});
