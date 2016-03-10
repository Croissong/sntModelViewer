import React, { PropTypes } from 'react';
import { Field } from 'react-redux-form';

export default class EditorForm extends React.Component {

  static propTypes = {
    editedModel: PropTypes.object.isRequired
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

  createFormFields = () => {
    let m = this.props.editedModel;
    return Object.keys(m).map(f => {
      let type = this.getType(m[f]);
      return (
        <Field key={f} model={'editor.editor.editedModel.' + f}>
          <label>{f}</label><br/>
          <label>({type})</label><br/>
          <input type={type} id={f}></input>
        </Field>
      );
    }
    );
  };

  onSave = () => {
    console.log('submit');
  }

  render () {
    return (
      <form onSubmit={this.onSave}>
        {this.createFormFields()}
        <button type='submit'>
          Save
        </button>
      </form>
    );
  }
}
