import React, { PropTypes } from 'react';
import { Field } from 'react-redux-form';

export default class EditorForm extends React.Component {

  static propTypes = {
    editedFields: PropTypes.object.isRequired,
    resetFields: PropTypes.func.isRequired,
    saveModel: PropTypes.func.isRequired
  };

  getVal = (field) => (
    typeof (field) === 'object' ? field.value : field
  );

  getType = (field) => {
    return typeof (field) === 'object' ? this.parseType(field.type) : typeof (field);
  };

  parseType = (str) => {
    return str === 'java.lang.Class' ? str : typeof (str);
  };

  checkValidity = (f) => this.props.checkValidity('editor.editedModel.' + f);

  createFormFields = () => {
    let fields = this.props.editedFields;
    return Object.keys(fields).map(field => {
      let type = this.getType(fields[field]);
      return (
        <Field key={field} model={field}>
          <label>{field}</label><br/>
          <label>({type})</label><br/>
          <input
            id={field}
            value={fields[field]}
            onBlur={this.checkValidity.bind(field)}>
          </input>
        </Field>
      );
    }
    );
  };

  render () {
    let p = this.props;
    return (
      <form>
        {this.createFormFields()}
        <button type='button' onClick={p.saveModel}>
          Save
        </button>
        <button type='button' onClick={p.resetFields}>
          Reset
        </button>
      </form>
    );
  }
}
