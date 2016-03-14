import { combineReducers } from 'redux-immutable';
import router from './routerReducer';
import model from './modules/model';
import modelDefs from './modules/modelDefs';
import editor from './modules/editor';
import { formReducer } from 'react-redux-form';

export default combineReducers({
  modelDef: modelDefs,
  model: model,
  editor: editor,
  editorForm: formReducer('editor.editedModel'),
  router: router
});
