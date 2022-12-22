/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expectation from '../__fixtures__/expectation.js';
import diff from '../src/diff.js';
import * as formatter from '../src/formatter/formatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fpJSON = `${__dirname}/../__fixtures__/json/`;
const fpYAML = `${__dirname}/../__fixtures__/yaml/`;
const fpCommon = `${__dirname}/../___fixtures_/common/`;

describe('Test JSON', () => {
  test('diff #1', () => {
    const path1 = `${fpJSON}file1.json`;
    const path2 = `${fpJSON}file2.json`;
    expect(`\n{${formatter.stylish(diff(path1, path2))}\n}`).toEqual(expectation);
  });
});

describe('Test YAML', () => {
  test('diff #1', () => {
    const path1 = `${fpYAML}file1.yaml`;
    const path2 = `${fpYAML}file2.yml`;
    expect(`\n{${formatter.stylish(diff(path1, path2))}\n}`).toEqual(expectation);
  });
});

describe('Test common', () => {
  test('File types', () => {
    const path1 = `${fpCommon}file.abc`;
    const path2 = `${fpJSON}file1.json`;
    expect(() => `\n{${formatter.stylish(diff(path1, path2))}\n}`).toThrow('Cannot compare two different types of files');
  });

  test('Unsupported mode', () => {
    const filePath = `${fpCommon}file.abc`;
    expect(() => `\n{${formatter.stylish(diff(filePath, filePath))}\n}`).toThrow('Unsupported file type');
  });
});
