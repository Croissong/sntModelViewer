import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import IndexedModelViewer from 'components/IndexedModelViewer';
import ModelEditor from 'components/ModelEditor';
import { actions as editorActions, fetchModel } from 'redux/modules/editor';

export default class ModelViewer extends React.Component {

  static propTypes = {
    indexedModels: PropTypes.object.isRequired,
    editorState: PropTypes.object.isRequired,
    editModel: PropTypes.func.isRequired,
    fetchModel: PropTypes.func.isRequired
  }

  editModel = (id) => {
    this.props.editModel(id);
    this.props.fetchModel(id);
  }

  render () {
    let models = this.props.indexedModels.models;
    let editorState = this.props.editorState;
    let selectedModel = models.filter(model => model.id === editorState.selected)[0];
    return (
      <div>
        <IndexedModelViewer
          models={models}
          editModel={this.editModel}
          fetchModel={this.props.fetchModel}
        />
        <ModelEditor
          model={selectedModel}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    indexedModels: state.indexedModels,
    editorState: state.editor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editModel: (id) => dispatch(editorActions.editModel(id)),
    fetchModel: (id) => dispatch(fetchModel(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelViewer);
