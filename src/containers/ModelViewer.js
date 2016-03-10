import { connect } from 'react-redux';
import React from 'react';
import ModelEditor from 'components/ModelEditor';
import { fetchModel } from 'redux/modules/model';
import { actions, saveModel } from 'redux/modules/editor';
import i from 'icepick';

const ConnectedModelEditor = connect(
  (s) => {
    let def = s.modelDefs.selected;
    let id = s.model.selected[def] || 1;
    let model = s.model[def][id];
    return {
      active: s.editor.editor.active,
      model: model,
      editedFields: s.editor.editor.editedModel
    };
  },
  (dispatch) => ({
    resetFields: (model) => dispatch(fetchModel(model.modelDef, model.fields.id, actions.resetModel)),
    saveModel: (model, editedFields) => dispatch(saveModel(i.assocIn(model, ['fields'], editedFields)))
  })
)(ModelEditor);

export default class ModelViewer extends React.Component {

  render () {
    return (
      <ConnectedModelEditor/>
    );
  }
}
