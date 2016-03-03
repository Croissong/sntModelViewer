import { connect } from 'react-redux';
import React from 'react';
import ModelEditor from 'components/ModelEditor';

const ConnectedModelEditor = connect(
  (state) => {
    let def = state.modelDefs.selected;
    let id = state.indexedModel.selected[def];
    let models = state.model[def];
    if (!models || !models[id]) {
      return {
        model: {},
        fetching: true,
        active: state.editor.active
      };
    } else {
      return {
        model: models[id],
        fetching: state.model.fetching[def].includes(id),
        active: state.editor.active
      };
    }
  }
)(ModelEditor);

export default class ModelViewer extends React.Component {

  render () {
    return (
      <ConnectedModelEditor/>
    );
  }
}
