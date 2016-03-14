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
      modelDefs: state.getIn('modelDef', 'modelDefs'),
      selected: state.getIn('modelDef', 'selected')
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
      models: getIndexedModels(state),
      fetching: isFetching(state)
    }
  ),
  (dispatch) => (
    {
      editModel: (id) => {
        dispatch(fetchModel(id, editorActions.editModel));
        dispatch(iModelActions.selectIndexedModel(id));
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

const getIndexedModels = (state) => {
  if (isFetching(state)) return [];
  let md = state.getIn(['modelDefs', 'selected']);
  return state.getIn(['model', md])
              .map(id => state.getIn(['model', 'models', id]))
              .toJS();
};

const isFetching = (state) => {
  let md = state.getIn(['modelDef', 'selected']);
  return state.getIn(['model', 'fetching_indexed']).includes(md);
};
