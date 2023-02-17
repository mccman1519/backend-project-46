import { isRealObject, stringify } from '../utils/utils.js';

export default (arrayDiff, spacer = ' ', spacesCount = 2) => {
  const initCount = spacesCount;

  const unfold = (nested, unfoldSpacer, unfoldSpacesCount) => {
    let spaces = unfoldSpacer.repeat(unfoldSpacesCount);

    const result = nested.reduce((acc, item) => {
      const [feature, key, value, oldValue] = item;
      if (Array.isArray(value)) {
        return `${acc}${spaces}${feature} ${key}: ${unfold(value, unfoldSpacer, unfoldSpacesCount + initCount + 2)}\n`;
      }

      if (isRealObject(value) || isRealObject(oldValue)) {
        if (feature === 'u') {
          const updated = `${spaces}- ${key}: ${stringify(oldValue, unfoldSpacer, unfoldSpacesCount + initCount + 4)}\n`;
          const updatedWith = `${spaces}+ ${key}: ${stringify(value, unfoldSpacer, unfoldSpacesCount + initCount + 4)}\n`;
          return `${acc}${updated}${updatedWith}`;
        }
        return `${acc}${spaces}${feature} ${key}: ${stringify(value, unfoldSpacer, unfoldSpacesCount + initCount + 4)}\n`;
      }

      if (feature === 'u') {
        const updated = `${spaces}- ${key}: ${oldValue}\n`;
        const updatedWith = `${spaces}+ ${key}: ${value}\n`;
        return `${acc}${updated}${updatedWith}`;
      }
      return `${acc}${spaces}${feature} ${key}: ${value}\n`;
    }, '');

    spaces = unfoldSpacer.repeat(unfoldSpacesCount - initCount);
    return `{\n${result}${spaces}}`;
  };

  return `${unfold(arrayDiff, spacer, spacesCount)}`;
};
