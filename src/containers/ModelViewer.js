import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import ModelEditor from 'components/ModelEditor';
import { fetchModel } from 'redux/modules/model';
import { actions, saveModel } from 'redux/modules/editor';
import i from 'icepick';

const ConnectedModelEditor = connect(
  (s) => {
    let def = s.modelDefs.selected;
    let id = s.model.selected[def] || 1;
    let model = s.model[def][id] || {};
    return {
      model: model,
      editedFields: s.editor.editor.editedModel
    };
  },
  (dispatch) => ({
    resetFields: (model) => dispatch(fetchModel(model.modelDef, model.fields.id, actions.resetModel)),
    saveModel: (model, editedFields) => dispatch(saveModel(i.assocIn(model, ['fields'], editedFields)))
  })
)(ModelEditor);

class ModelViewer extends React.Component {

  static propTypes = {
    active: PropTypes.bool.isRequired
  };

  render () {
    if (this.props.active) {
      return (
        <ConnectedModelEditor/>
      );
    }
    return null;
  }
}

export default connect(
  (s) => ({active: s.editor.editor.active})
)(ModelViewer);
