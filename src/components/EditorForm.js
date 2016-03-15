import React, { PropTypes as PT} from 'react';
import FormFields from './FormFields';

export default class EditorForm extends React.Component {

  static propTypes = {
    editedFields: PT.object.isRequired,
    resetFields: PT.func.isRequired,
    saveModel: PT.func.isRequired,
    parsers: PT.shape({ field: PT.func }).isRequired,
    validators: PT.shape({ field: PT.func }).isRequired
  };

  render () {
    let p = this.props;
    return (
      <form>
        <FormFields
          fields={p.editedFields}
          parsers={p.parsers}
          validators={p.validators}
        />
        <button type='button' onClick={p.saveModel}>
          Save
        </button>
        <button type='button' onClick={p.resetFields}>
          Reset
        </button>
      </form>
    );
  };
};
