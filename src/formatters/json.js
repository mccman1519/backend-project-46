import _ from 'lodash';

const statham = (value) => JSON.stringify(value, null, 2);

const formatVal = (value) => {
  if (!_.isObject(value)) return value;

  return JSON.stringify(value);
};

export default (arrayDiff) => {
  const unfold = (nested, parrent) => {
    const result = nested.reduce((acc, item) => {
      const [type, prop, value, oldValue] = item;
      const deeperParrent = parrent ? `${parrent}.${prop}` : prop;

      if (_.isArray(value)) {
        return [...acc, ...unfold(value, deeperParrent)];
      }

      if (type === '+') {
        return [...acc, { path: deeperParrent, diff: { type, value: formatVal(value) } }];
      }
      if (type === '-') {
        return [...acc, { path: deeperParrent, diff: { type } }];
      }
      if (type === 'u') {
        return [
          ...acc,
          {
            path: deeperParrent,
            diff: { type, value: formatVal(value), oldValue: formatVal(oldValue) },
          },
        ];
      }
      return acc;
    }, []);

    return result;
  };

  return statham({ diffs: [...unfold(arrayDiff)] });
};
