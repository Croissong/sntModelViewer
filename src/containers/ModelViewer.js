import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ModelEditor from 'components/ModelEditor';
import { actions as editorActions} from 'redux/modules/editor';
import { fetchModel } from 'redux/api/graphViewApi';

const ModelEditor = connect(
  (state) => (
    {
      models: state.models,
    }
  )
)(ModelEditor);


export default class ModelViewer extends React.Component {

  render () {
    let model = getModel();
    return (0
      <ModelEditor
          model={model}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    models: state.models,
    selected: state.indexedModels.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelViewer);
