import { Field } from 'react-redux-form';
import React from 'react';

export default (p) => (
  <div> {
    Object.entries(p.fields).map(([key, value]) => (
      <Field
        key={key}
        model={key}
        parser={p.parsers[key]}
        validators={{ valid: p.validators[key] }}
        validateOn='blur'>
        <label>{key}</label><br/>
        <input
          value={parseValue(value)}
        />
      </Field>
    ))}
  </div>
);

const parseValue = (field) => (
  typeof (field) === 'object' ? field.value : field
);
