import _ from 'lodash';
import { parseJSON, parseYAML } from './parsers.js';
import { getCompareMode, getFileType, isRealObject } from './utils/utils.js';

const diff = (object1, object2) => {
  const object2Keys = _.sortBy(Object.keys(object2));
  const arrDiff = Object.keys(object1)
    //.sort() // is not necessary here
    .reduce((acc, key) => {
      if (!Object.hasOwn(object2, key)) {
        // no such key in object2
        acc.push(['-', key, object1[key]]);
      } else {
        // where is a key, check values
        // Must be deep equality check 'cause we could have nested items
        if (!_.isEqual(object1[key], object2[key])) {
          // Are we dealing with objects?
          if (isRealObject(object1[key]) && isRealObject(object2[key])) {            
            acc.push([' ', key, diff(object1[key], object2[key])]);
          } else {
            acc.push(['-', key, object1[key]]);
            acc.push(['+', key, object2[key]]);
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

  return diff(parsedData.file1, parsedData.file2);
};

/*
console.dir(
  diff({
    "common": {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value",
        "doge": {
          "wow": ""
        }
      }
    },
    "group1": {
      "baz": "bas",
      "foo": "bar",
      "nest": {
        "key": "value"
      }
    },
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  }, {
    "common": {
      "follow": false,
      "setting1": "Value 1",
      "setting3": null,
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      },
      "setting6": {
        "key": "value",
        "ops": "vops",
        "doge": {
          "wow": "so much"
        }
      }
    },
    "group1": {
      "foo": "bar",
      "baz": "bars",
      "nest": "str"
    },
    "group3": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }),
  {depth: Infinity}
)
*/