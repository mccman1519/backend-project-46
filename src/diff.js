import _ from 'lodash';
import { parseJSON, parseYAML } from './parsers.js';
import { getCompareMode, getFileType, isRealObject } from './utils/utils.js';
import formatter from './formatters/index.js';

const diff = (object1, object2) => {
  const object2Keys = _.sortBy(Object.keys(object2));
  const arrDiff = Object.keys(object1)
    .reduce((acc, key) => {
      if (!Object.hasOwn(object2, key)) {
        acc.push(['-', key, object1[key]]);
      } else {
        if (!_.isEqual(object1[key], object2[key])) {
          if (isRealObject(object1[key]) && isRealObject(object2[key])) {
            acc.push([' ', key, diff(object1[key], object2[key])]);
          } else {
            acc.push(['u', key, object2[key], object1[key]]);
          }
        } else {
          acc.push([' ', key, object1[key]]);
        }
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

export default (filePath1, filePath2, format) => {
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

  return formatter[format](diff(parsedData.file1, parsedData.file2));
};
