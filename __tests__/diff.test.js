/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expectation from '../__fixtures__/expectation.js';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fpJSON = `${__dirname}/../__fixtures__/json/`;
const fpYAML = `${__dirname}/../__fixtures__/yaml/`;
const fpCommon = `${__dirname}/../___fixtures_/common/`;

describe('Test JSON', () => {
  const path1 = `${fpJSON}file1.json`;
  const path2 = `${fpJSON}file2.json`;

  test('stylish', () => {
    expect(`${diff(path1, path2, 'stylish')}`).toEqual(expectation.stylish);
  });
  test('plain', () => {
    expect(`${diff(path1, path2, 'plain')}`).toEqual(expectation.plain);
  });
  test('json', () => {
    expect(`${diff(path1, path2, 'json')}`).toEqual(expectation.json);
  });
});

describe('Test YAML', () => {
  const path1 = `${fpYAML}file1.yaml`;
  const path2 = `${fpYAML}file2.yml`;

  test('stylish', () => {
    expect(`${diff(path1, path2, 'stylish')}`).toEqual(expectation.stylish);
  });
  test('plain', () => {
    expect(`${diff(path1, path2, 'plain')}`).toEqual(expectation.plain);
  });
  test('json', () => {
    expect(`${diff(path1, path2, 'json')}`).toEqual(expectation.json);
  });
});

describe('Test common', () => {
  test('File types', () => {
    const path1 = `${fpCommon}file.abc`;
    const path2 = `${fpJSON}file1.json`;
    expect(() => `${diff(path1, path2, 'stylish')}`).toThrow('Cannot compare two different types of files');
  });

  test('Unsupported mode', () => {
    const filePath = `${fpCommon}file.abc`;
    expect(() => `${diff(filePath, filePath, 'stylish')}`).toThrow('Unsupported file type');
  });
});
