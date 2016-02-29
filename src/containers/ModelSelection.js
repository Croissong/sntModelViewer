import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ModelDefSelection from 'components/ModelDefSelection';
import { actions as mdActions, fetchModelDefs } from 'redux/modules/modelDefs';
import IndexedModelViewer from 'components/IndexedModelViewer';
import { actions as imActions, fetchIndexedModels } from 'redux/modules/indexedModels';
import { fetchModel } from 'redux/modules/models';

const ModelDefSelection = connect(
  (state) => (
    {
      modelDefs: state.modelDefs,
    }
  ),
  (dispatch) => (
    {
      fetchModelDefs: () => dispatch(fetchModelDefs()),
      selectModelDef: (modelDef) => {
        dispatch(fetchIndexedModels(modelDef));
        dispatch(mdActions.select(modelDef));
      },
    }
  )
)(ModelDefSelection);


const IndexedModelViewer = connect(
  (state) => (
    {
      models: state.indexedModels,
    }
  ),
  (dispatch) => (
    {
      editModel: (id) => {
        dispatch(fetchModel(id));
        dispatch(imActions.select(id));
      },
    }
  )
)(IndexedModelViewer);


export default class ModelSelection extends React.Component {
  render () {
    return (
      <div>
        <ModelDefSelection/>
        <IndexedModelViewer/>
      </div>
    );
  }
}
