import _ from 'lodash';
import { parseJSON, parseYAML } from './parsers.js';
import { getCompareMode, getFileType } from './utils/utils.js';
import stylish from './formatter/stylish.js';

const diff = (object1, object2) => {
  const object2Keys = _.sortBy(Object.keys(object2));
  const arrDiff = Object.keys(object1)
    .sort()
    .reduce((acc, key) => {
      if (!Object.hasOwn(object2, key)) {
        // no such key in object2
        acc.push(['-', key, object1[key]]);
      } else if (object1[key] !== object2[key]) {
        // another value on the same key
        acc.push(['-', key, object1[key]]);
        acc.push(['+', key, object2[key]]);
        _.remove(object2Keys, (what) => what === key);
      } else {
        acc.push([' ', key, object1[key]]);
        _.remove(object2Keys, (what) => what === key);
      }
      return acc;
    }, []);

  object2Keys.map((key) => arrDiff.push(['+', key, object2[key]]));

  return arrDiff.sort((a, b) => {
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    return 0;
  });
};

export default (filePath1, filePath2) => {
  const parsedData = {};
  const compareMode = getCompareMode(
    getFileType(filePath1),
    getFileType(filePath2),
  );

  switch (compareMode) {
  case 'json':
    parsedData.file1 = parseJSON(filePath1);
    parsedData.file2 = parseJSON(filePath2);
    break;
  case 'yaml':
    parsedData.file1 = parseYAML(filePath1) ?? '';
    parsedData.file2 = parseYAML(filePath2) ?? '';
    break;
  default:
    throw (new Error(`Unsupported file type '${compareMode}'`));
  }

  const arrayDiff = diff(parsedData.file1, parsedData.file2);

  return `\n{${stylish(arrayDiff)}\n}`;
};
