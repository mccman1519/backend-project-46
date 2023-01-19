import { isRealObject, stringify, getExactType } from '../utils/utils.js';

export default (arrayDiff, spacer = ' ', spacesCount = 2) => {
  //console.dir(arrayDiff, { depth: 15 })
  const initCount = spacesCount;
  
  const unfold = (nested, spacer, spacesCount) => {
    let spaces = spacer.repeat(spacesCount);

    const result = nested.reduce((result, item) => {
      const [feature, key, value] = item;
      if (Array.isArray(value)) {
        return `${result}${spaces}${feature} ${key}: ${unfold(value, spacer, spacesCount + initCount + 2)}\n`;
      }

      if (isRealObject(value)) {
        // Unfold object here
        return `${result}${spaces}${feature} ${key}: ${stringify(value, spacer, spacesCount + initCount +4)}\n`;
      }
      return `${result}${spaces}${feature} ${key}: ${value}\n`;
    }, '');

    spaces = spacer.repeat(spacesCount - initCount);
    return `{\n${result}${spaces}}`;
  };

  return `\n${unfold(arrayDiff, spacer, spacesCount)}`;
};
