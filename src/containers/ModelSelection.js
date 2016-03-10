import React from 'react';
import { connect } from 'react-redux';
import ModelDefSelection from 'components/ModelDefSelection';
import { actions as defActions, fetchModelDefs } from 'redux/modules/modelDefs';
import IndexedModelViewer from 'components/IndexedModelViewer';
import { fetchModel } from 'redux/modules/model';
import { actions as iModelActions, fetchIndexedModels } from 'redux/modules/indexedModel';
import { actions as editorActions } from 'redux/modules/editor';

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
        dispatch(defActions.selectModelDef(modelDef));
      }
    }
  )
)(ModelDefSelection);

const ConnectedIndexedModelViewer = connect(
  (state) => (
    {
      modelDef: state.modelDefs.selected,
      models: state.model[state.modelDefs.selected]
    }
  ),
  (dispatch) => (
    {
      editModel: (modelDef, id) => {
        dispatch(fetchModel(modelDef, id, editorActions.editModel));
        dispatch(iModelActions.selectIndexedModel(modelDef, id));
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
