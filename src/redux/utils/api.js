import {requestIndexedFields, receiveIndexedFields} from '../modules/indexedFields';
import {requestFields, receiveFields} from '../modules/models';

export const fetchIndexedFields = (modelDef) =>
  (dispatch) => {
    dispatch(requestIndexedFields(modelDef));
    return fetch('http://localhost:3005/indexedModels/' + modelDef)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveIndexedFields(modelDef, json.fields))
       );
  };

export const fetchFields = (id, action) => {
  (dispatch) => {
    dispatch(requestFields(id));
    return fetch('http://localhost:3005/models/' + id)
       .then(response => response.json())
       .then(json => {
         let model = Immutable.fromJS(json.fields);
         dispatch(receiveModel(id, model));
         if (action) dispatch(action(id, model));
       });
  };
}

export function fetchModelDefs () {
  return function (dispatch) {
    dispatch(request());
    return fetch('http://localhost:3005/modeldefs')
       .then(response => response.json())
       .then(json =>
         dispatch(receive(json))
       );
  };
}

export function saveModel (model) {
  return function (dispatch) {
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
}

