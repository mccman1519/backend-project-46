/* eslint-disable no-undef */
import diff from '../src/diff.js';
import expectation from './__fixtures__/expectation.js';

const fpJSON = '__tests__/__fixtures__/json/';
const fpYAML = '__tests__/__fixtures__/yaml/';
const fpCommon = '__tests__/__fixtures__/common/';

describe('Test JSON', () => {
  test('diff #1', () => {
    const path1 = `${fpJSON}file1.json`;
    const path2 = `${fpJSON}file2.json`;
    expect(diff(path1, path2)).toEqual(expectation);
  });
});

describe('Test YAML', () => {
  test('diff #1', () => {
    const path1 = `${fpYAML}file1.yaml`;
    const path2 = `${fpYAML}file2.yml`;
    expect(diff(path1, path2)).toEqual(expectation);
  });
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
