export const mapById = (arr) => (
  arr.reduce((obj, e) => {
    obj[e.id] = e;
    return obj;
  }, {})
);
