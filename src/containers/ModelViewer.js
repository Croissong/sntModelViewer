import { connect } from 'react-redux';
import React from 'react';
import ModelEditor from 'components/ModelEditor';

const ConnectedModelEditor = connect(
  (s) => {
    let def = s.modelDefs.selected;
    let id = s.indexedModel.selected.def;
    let models = s.model[def];
    return {
      model: models[id],
      fetching: s.model.fetching.includes({modelDef: def, id: id})
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
