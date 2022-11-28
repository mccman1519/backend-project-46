/* eslint-disable no-undef */
import diff from '../src/diff.js';

const expectation1 = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectation2 = `
{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  - trulala: NONE
  + verbose: true
}`;

const expectation3 = `
{
  + follow: false
    host: hexlet.io
  + proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  - verbose: true
}`;

const filePath1 = '__tests__/fixtures/file1.json';
const filePath2 = '__tests__/fixtures/file2.json';

const filePath3 = '__tests__/fixtures/file3.json';
const filePath4 = '__tests__/fixtures/file4.json';

const filePath5 = '__tests__/fixtures/file5.json';
const filePath6 = '__tests__/fixtures/file6.json';

beforeAll(() => {

});

test('diff1', () => {
  expect(diff(filePath1, filePath2)).toEqual(expectation1);
});

test('diff2', () => {
  expect(diff(filePath3, filePath4)).toEqual(expectation2);
});

test('diff3', () => {
  expect(diff(filePath5, filePath6)).toEqual(expectation3);
});
