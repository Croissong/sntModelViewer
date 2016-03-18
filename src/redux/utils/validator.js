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

export const getValidator = (model) => {
  return model.entrySeq().reduce((validators, [key, value]) => {
    let schema = typeof value === 'object' ? value.get('validator') : false;
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
