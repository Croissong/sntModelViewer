export const mapById = (models, modelDef) => (
  models.reduce((obj, m) => {
    m.modelDef = modelDef;
    obj[m.id] = m;
    return obj;
  }, {})
);
