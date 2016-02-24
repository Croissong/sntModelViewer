import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import models from './modules/models';
import modeldefs from './modules/modeldefs';

export default combineReducers({
  modeldefs,
  models,
  counter,
  router
});
