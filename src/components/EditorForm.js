import React, { PropTypes } from 'react';
import { Field, actions } from 'react-redux-form';

class EditorForm extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    editField: PropTypes.func.isRequired
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

  onEdit

  createFormFields = () => {
    let model = this.props.model;
    return Object.keys(model).map(f => {
      let val = this.getVal(model[f]);
      let type = this.getType(model[f]);
      return (
        <Field key={f} model={'editedModel.'+f}>
          <label>{f}</label>
          <label>{type}</label>
          <input type={type} id={f} value={val}></input>
          </Field>
      );
    }
    );
  };

  render () {
    return (
      <form onSubmit={() => console.log("submit")}>> 
        {this.createFormFields()}
        <button type="submit">
          Finish registration, { user.firstName } { user.lastName }!
        </button>
      </form>
      
    );
  }
}



EditorForm = reduxForm({
  form: 'editor',
  fields: ['firstName', 'lastName', 'email']
})(EditorForm);

export default ContactForm;
