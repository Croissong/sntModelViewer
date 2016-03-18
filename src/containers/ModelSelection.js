import React from 'react';
import {connect} from 'react-redux';
import ModelDefSelection from 'components/ModelDefSelection';
import {selectModelDef} from 'redux/modules/modelDef';
import IndexedModelViewer from 'components/IndexedModelViewer';
import {selectModel} from 'redux/modules/indexedFields';
import {fetchIndexedFields, fetchModelDefs, fetchFields} from 'redux/utils/api';
import {editModel} from 'redux/modules/editor';

const ConnectedModelDefSelection = connect(
  (state) => (
    {
      modelDefs: state.getIn(['modelDef', 'entities']),
      selected: state.getIn(['modelDef', 'selected'])
    }
  ),
  (dispatch) => (
    {
      fetchModelDefs: () => dispatch(fetchModelDefs()),
      selectModelDef: (modelDef) => {
        dispatch(fetchIndexedFields(modelDef));
        dispatch(selectModelDef(modelDef));
      }
    }
  )
)(ModelDefSelection);

const ConnectedIndexedModelViewer = connect(
  (state) => (
    {
      models: getIndexedFields(state),
      fetching: isFetching(state)
    }
  ),
  (dispatch) => (
    {
      editModel: (id) => {
        dispatch(fetchFields(id, editModel));
        dispatch(selectModel(id));
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

const getIndexedFields = (state) => {
  if (isFetching(state)) return [];
  let md = state.getIn(['modelDef', 'selected']);
  let ids = state.getIn(['model', md]);
  return ids.map(id => ({id: id,
                         fields: state.getIn(['model', 'indexedFields', id])}));
};

const isFetching = (state) => {
  let md = state.getIn(['modelDef', 'selected']);
  return state.getIn(['model', 'fetching_indexed']).includes(md);
};
