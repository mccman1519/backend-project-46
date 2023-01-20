import { isRealObject } from '../utils/utils.js';

export default (arrayDiff) => {
  console.dir(arrayDiff, { depth: 15 });

  const unfold = (nested) => {
    const result = nested.reduce((acc, item) => {
      const [feature, key, , oldValue] = item;
      let [, , value] = item;

      if (Array.isArray(value)) {
        return `${acc}${key}${unfold(value)}.`;
      }

      if (isRealObject(value) || isRealObject(oldValue)) {
        // Complex value
        value = '[complex value]';
      } else {
        value = `'${value}'`;
      }

      // Not object value
      if (feature === '+') {
        return `${acc}.${key} was added with value: ${value}\n`;
      }
      if (feature === '-') {
        return `${acc}.${key} was removed\n`;
      }
      if (feature === 'u') {
        return `${acc}.${key} was updated. From ${oldValue} to ${value}\n`;
      }
      return ''; // No changes
    }, 'Property ');

    return `${result}`;
  };

  return `\n${unfold(arrayDiff)}`;
};
