import Immutable from 'immutable'
import Validator from 'jsonschema';

export const getParser = (model) => {
  return model.entrySeq().reduce((parsers, [key, value]) => {
    let pattern = typeof value === 'object' ? value.getIn(['validator', 'pattern']) : false;
    if (pattern) {
      let regex = new RegExp(pattern);
      parsers[key] = (val) => (
        val.replace(new RegExp('((?:' + regex.source + ')+)|.', 'g'), (full, matched) => (
          (typeof matched !== 'undefined') ? matched : ''
        ))
      );
    } else {
      parsers[key] = (val) => (val);
    }
    return parsers;
  }, {});
};

export const getValidator = (fields) => {
  extractValidators(fields);
  return fields.entrySeq().reduce((validators, [key, value]) => {
? value.get('validator') : false;
    if (schema) {
      validators[key] = (val) => {
        return Validator.validate(val, schema.toJS());
      };
    } else {
      validators[key] = (_) => ({valid: true});
    }
    return validators;
  }, {});
};

const isNested = (value) => typeof value === 'object';

const extractValidators = (fields) => {
  fields = Immutable.fromJS(fields);
  let validators = Immutable.fromJS();
  fields.entrySeq.forEach(([key, value]) => {
    if (isNested(value)) {
      fields.set(key, value.value);
      validators.set(key, value.validator)
        value = extractValidator(value);
      value = value.value()
        // }
        console.log(schema);
      validators[key] = schema;
    });
  };
}
