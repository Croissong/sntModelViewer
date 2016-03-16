import { Field } from 'react-redux-form';
import React, { PropTypes as PT } from 'react';
import classes from 'styles/_base.scss';

export default function FormFields (props) {
  let {fields, validators, parsers, errors} = props;
  return (
    <div> {
      fields.entrySeq().map(
        ([key, value]) => {
          let err = getError(errors, key);
          return (
            <div key={key}>
              <Field
                model={key}
                parser={parsers.get(key)}
                validators={{schema: validators.get(key)}}
                validateOn='blur'>
                <label>{key}</label><br/>
                <input className={err ? classes.invalid : classes.valid}
                  value={parseValue(value)}
                />
              </Field>
              {err}
            </div>
          );
        })}
    </div>
  );
};

FormFields.propTypes = {
  fields: PT.object,
  parsers: PT.shape({ field: PT.func }).isRequired,
  validators: PT.shape({ field: PT.func }).isRequired,
  errors: PT.object
};

const parseValue = (field) => (
  typeof (field) === 'object' ? field.get('value') : field
);

const getError = (errors, key) => {
  if (errors) {
    let error = errors.get(key);
    return error ? <div>{error[0].message}</div> : undefined;
  } else {
    return undefined;
  }
};
