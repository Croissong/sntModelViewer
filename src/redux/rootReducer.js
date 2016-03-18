import { combineReducers } from 'redux-immutable';
import {formReducer} from 'react-redux-form';
import router from './routerReducer';
import model from './modules/model';
import modelDef from './modules/modelDef';
import editor from './modules/editor';

export default combineReducers({
  modelDef: modelDef,
  model: model,
  editor: editor,
  editorForm: formReducer('editor.editedModel'),
  router: router
});
