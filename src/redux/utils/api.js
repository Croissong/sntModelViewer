import Immutable from 'immutable';
import {requestIndexedFields, receiveIndexedFields} from '../modules/indexedFields';
import {requestFields, receiveFields} from '../modules/model';
import {receiveModelDefs, requestModelDefs} from '../modules/modelDef';
import {savingModel, savedModel} from '../modules/editor';
import {normalize, Schema, arrayOf} from 'normalizr';

export const fetchIndexedFields = (modelDef) => {
  return (dispatch) => {
    dispatch(requestIndexedFields(modelDef));
    return fetch('http://localhost:3005/indexedModels/' + modelDef)
       .then(response => response.json())
       .then(json => {
         normalizeFields(json.fields, modelDef);
         dispatch(receiveIndexedFields(modelDef, json.fields));
       });
  };
};

export const fetchFields = (id, action) => {
  return (dispatch) => {
    dispatch(requestFields(id));
    return fetch('http://localhost:3005/models/' + id)
       .then(response => response.json())
       .then(json => {
         let model = Immutable.fromJS(json.fields);
         dispatch(receiveFields(id, model));
         if (action) dispatch(action(id, model));
       });
  };
};

export const fetchModelDefs = () => {
  return (dispatch) => {
    dispatch(requestModelDefs());
    return fetch('http://localhost:3005/modeldefs')
       .then(response => response.json())
       .then(json =>
         dispatch(receiveModelDefs(json))
       );
  };
};

export const saveModel = (model) => {
  return (dispatch) => {
    let body = JSON.stringify({id: model.get('id'), fields: model.get('fields')});
    dispatch(savingModel(model));
    return fetch(
      'http://localhost:3005/models/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }
    ).then(response => response.json())
     .then(json => {
       dispatch(savedModel(model));
     });
  };
};

const normalizeFields = (fields, modelDef) => {
  let field = new Schema('fields', { idAttribute: field => {
    console.log(field);
    createId(modelDef, field.id);
  }});
  let x = normalize(fields, arrayOf(field));
  return fields;
};

const createId = (modelDef, id) => {
  id = modelDef + '_' + id;
  console.log(id);
  return id;
};
