import React, { PropTypes } from 'react';
import EditorForm from 'components/EditorForm';

export default class ModelEditor extends React.Component {

  static propTypes = {
    model: PropTypes.object,
    editedFields: PropTypes.object,
    resetFields: PropTypes.func.isRequired,
    saveModel: PropTypes.func.isRequired
  };

  save = () => this.props.saveModel(this.props.model, this.props.editedFields);

  reset = () => this.props.resetFields(this.props.model);

  render () {
    let p = this.props;
    if (!p.model.fetching) {
      return (
        <EditorForm
            editedFields={p.editedFields}
            resetFields={this.reset}
            saveModel={this.save}
        />
      );
    }
    return null;
  }
}
