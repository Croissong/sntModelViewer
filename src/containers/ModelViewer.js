import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import ModelEditor from 'components/ModelEditor';
import { fetchModel } from 'redux/modules/model';
import { actions, saveModel } from 'redux/modules/editor';
import { actions as formActions } from 'react-redux-form';

const ConnectedModelEditor = connect(
  (state) => ({
    model: getSelectedModel(state),
    editedFields: getEditedFields(state)
  }),
  (dispatch) => ({
    resetFields: (model) => dispatch(fetchModel(model.get('id'),
                                                actions.resetModel)),
    saveModel: (model, editedFields) => {
      console.log(model);
      return dispatch(saveModel(model.set('fields', editedFields)));
    },
    checkValidity: (field) => {
      console.log(field);
      dispatch(formActions.validate(field, val => val === '1'));
    }
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

const getEditedFields = (s) => {
  let x = s.getIn(['editor', 'editedFields']);
  return x.toJS();
}
