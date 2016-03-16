import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import ModelEditor from 'components/ModelEditor';
import { fetchModel } from 'redux/modules/model';
import { actions, saveModel } from 'redux/modules/editor';

const ConnectedModelEditor = connect(
  (state) => ({
    model: getSelectedModel(state),
    editedFields: state.getIn(['editor', 'editedFields']),
    parsers: state.getIn(['editor', 'parsers', state.getIn(['editor', 'modelId'])]),
    validators: state.getIn(['editor', 'validators', state.getIn(['editor', 'modelId'])]),
    errors: state.getIn(['editor', 'errors'])
  }),
  (dispatch) => ({
    resetFields: (model) => dispatch(fetchModel(model.get('id'),
                                                actions.resetModel)),
    saveModel: (model, editedFields) => dispatch(saveModel(model.set('fields', editedFields)))
  })
)(ModelEditor);

class ModelViewer extends React.Component {

  static propTypes = {
    active: PropTypes.bool.isRequired
  };

  render () {
    if (this.props.active) {
      return (
        <ConnectedModelEditor/>
      );
    }
    return null;
  }
}

export default connect(
  (s) => ({active: s.getIn(['editor', 'active'])})
)(ModelViewer);

const getSelectedModel = (s) => {
  let id = s.getIn(['editor', 'modelId']);
  return s.getIn(['model', 'models', id], {});
};
