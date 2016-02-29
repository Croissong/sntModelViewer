import { connect } from 'react-redux';
import React from 'react';
import ModelEditor from 'components/ModelEditor';

const getSelectedModel = (state) => {
  let def = state.modelDefs.selected;
  let id = state.models.selected[def];
  return state.models[def].models[id];
};

const ConnectedModelEditor = connect(
  (state) => (
    {
      model: getSelectedModel(state)
    }
  )
)(ModelEditor);

export default class ModelViewer extends React.Component {

  render () {
    return (
      <ConnectedModelEditor/>
    );
  }
}
