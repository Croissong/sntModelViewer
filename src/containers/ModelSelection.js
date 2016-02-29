import React from 'react';
import { connect } from 'react-redux';
import ModelDefSelection from 'components/ModelDefSelection';
import { actions as defActions, fetchModelDefs } from 'redux/modules/modelDefs';
import IndexedModelViewer from 'components/IndexedModelViewer';
import { actions as modelActions, fetchIndexedModels, fetchModel } from 'redux/modules/models';

const ConnectedModelDefSelection = connect(
  (state) => (
    {
      modelDefs: state.modelDefs
    }
  ),
  (dispatch) => (
    {
      fetchModelDefs: () => dispatch(fetchModelDefs()),
      selectModelDef: (modelDef) => {
        dispatch(fetchIndexedModels(modelDef));
        dispatch(defActions.select(modelDef));
      }
    }
  )
)(ModelDefSelection);

const ConnectedIndexedModelViewer = connect(
  (state) => (
    {
      models: state.models[state.modelDefs.selected]
    }
  ),
  (dispatch) => (
    {
      editModel: (id) => {
        dispatch(fetchModel(id));
        dispatch(modelActions.select(id));
      }
    }
  )
)(IndexedModelViewer);

export default class ModelSelection extends React.Component {
  render () {
    return (
      <div>
        <ConnectedModelDefSelection/>
        <ConnectedIndexedModelViewer/>
      </div>
    );
  }
}
