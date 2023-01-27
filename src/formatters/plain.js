import _ from 'lodash';

const formatValue = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

export default (arrayDiff) => {
  const unfold = (nested, parrent) => {
    const result = nested.reduce((acc, item) => {
      const [feature, prop, value, oldValue] = item;
      const deeperParrent = parrent ? `${parrent}.${prop}` : `Property '${prop}`;

      if (_.isArray(value)) {
        return `${acc}${unfold(value, deeperParrent)}`;
      }

      if (feature === '+') {
        return `${acc}${deeperParrent}' was added with value: ${formatValue(value)}\n`;
      }
      if (feature === '-') {
        return `${acc}${deeperParrent}' was removed\n`;
      }
      if (feature === 'u') {
        return `${acc}${deeperParrent}' was updated. From ${formatValue(oldValue)} to ${formatValue(value)}\n`;
      }
      return `${acc}`;
    }, '');

    return `${result}`;
  };

  return `\n${unfold(arrayDiff).trim()}`;
};
