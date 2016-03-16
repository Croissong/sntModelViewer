import {requestIndexedFields, receiveIndexedFields} from '../modules/indexedFields.js';

export const fetchIndexedFields = (modelDef) =>
  (dispatch) => {
    dispatch(requestIndexedModels(modelDef));
    return fetch('http://localhost:3005/indexedModels/' + modelDef)
       .then(response => response.json())
       .then(json =>
         dispatch(receiveIndexedModels(modelDef, json.fields))
       );
  };
