/* eslint-disable no-undef */
import diff from '../src/diff.js';
import expectations from './__fixtures__/expectations.js';

const cases = {
  diff1: [
    'file1.',
    'file2.',
    expectations[0],
  ],
  diff2: [
    'file3.',
    'file4.',
    expectations[1],
  ],
  diff3: [
    'file5.',
    'file6.',
    expectations[2],
  ],
  diff4: [
    'file7.',
    'file8.',
    expectations[3],
  ],
  diff5: [
    'file9.',
    'file10.',
    expectations[4],
  ],
};

const fpJSON = '__tests__/__fixtures__/json/';
const fpYAML = '__tests__/__fixtures__/yaml/';
const fpCommon = '__tests__/__fixtures__/common/';

describe('Test JSON', () => {
  Object.entries(cases).map(([testName, testData]) => (
    test(`json ${testName}`, () => {
      let [path1, path2] = testData;
      const [, , expectation] = testData;
      path1 = `${fpJSON}${path1}json`;
      path2 = `${fpJSON}${path2}json`;
      expect(diff(path1, path2)).toEqual(expectation);
    })
  ));
});

describe('Test YAML', () => {
  Object.entries(cases).map(([testName, testData]) => (
    test(`yaml ${testName}`, () => {
      let [path1, path2] = testData;
      const [, , expectation] = testData;
      path1 = `${fpYAML}${path1}yaml`;
      path2 = `${fpYAML}${path2}yml`;
      expect(diff(path1, path2)).toEqual(expectation);
    })
  ));
});

describe('Test common', () => {
  test('File types', () => {
    const path1 = `${fpCommon}file.abc`;
    const path2 = `${fpJSON}file1.json`;
    expect(() => diff(path1, path2)).toThrow('Cannot compare two different types of files');
  });

  test('Unsupported mode', () => {
    const filePath = `${fpCommon}file.abc`;
    expect(() => diff(filePath, filePath)).toThrow('Unsupported file type');
  });
});
