import _ from 'lodash';
import fs from 'fs';

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
  const parsedFile1 = JSON.parse(fs.readFileSync(filePath1, 'utf-8'));
  const parsedFile2 = JSON.parse(fs.readFileSync(filePath2, 'utf-8'));

  let result = '';
  const spacing = '  ';

  diff(parsedFile1, parsedFile2).forEach((item) => {
    const [sign, key, value] = item;
    result = `${result}\n${spacing}${sign} ${key}: ${value}`;
  });

  return `\n{${result}\n}`;
};
