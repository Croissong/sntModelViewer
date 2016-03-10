export const mapById = (models, nestedKey) => (
  models.reduce((obj, m) => {
    obj[m.id] = {[nestedKey]: m};
    return obj;
  }, {})
);
