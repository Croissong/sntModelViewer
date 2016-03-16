import React, { PropTypes as PT } from 'react';
import EditorForm from 'components/EditorForm';

export default class ModelEditor extends React.Component {

  static propTypes = {
    model: PT.object,
    editedFields: PT.object,
    resetFields: PT.func.isRequired,
    saveModel: PT.func.isRequired,
    parsers: PT.shape({ field: PT.func }).isRequired,
    validators: PT.shape({ field: PT.func }).isRequired,
    errors: PT.object
  };

  save = () => this.props.saveModel(this.props.model, this.props.editedFields);

  reset = () => this.props.resetFields(this.props.model);

  render () {
    let p = this.props;
    if (!p.model.get('fetching')) {
      return (
        <EditorForm
          editedFields={p.editedFields}
          resetFields={this.reset}
          saveModel={this.save}
          parsers={p.parsers}
          validators={p.validators}
          errors={p.errors}
        />
      );
    }
    return null;
  }
}
