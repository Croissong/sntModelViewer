import { connect } from 'react-redux';
import React from 'react';
import ModelEditor from 'components/ModelEditor';

const ConnectedModelEditor = connect(
  (s) => {
    let def = s.modelDefs.selected;
    let id = s.model.selected[def] || 1;
    let model = s.model[def][id] || {};
    return {
      fetching: model.fetching,
      active: s.editor.editor.active,
      editedModel: s.editor.editor.editedModel
    };
  }
)(ModelEditor);

export default class ModelViewer extends React.Component {

  render () {
    return (
      <ConnectedModelEditor/>
    );
  }
}
