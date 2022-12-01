/* eslint-disable no-undef */
import expectations from '../__fixtures__/expectations.js';

export default (diff) => {
  const fpBase = '__tests__/__fixtures__/json/';

  const cases = {
    diff1: [
      `${fpBase}file1.json`,
      `${fpBase}file2.json`,
      expectations[0],
    ],
    diff2: [
      `${fpBase}file3.json`,
      `${fpBase}file4.json`,
      expectations[1],
    ],
    diff3: [
      `${fpBase}file5.json`,
      `${fpBase}file6.json`,
      expectations[2],
    ],
    diff4: [
      `${fpBase}file7.json`,
      `${fpBase}file8.json`,
      expectations[3],
    ],
    diff5: [
      `${fpBase}file9.json`,
      `${fpBase}file10.json`,
      expectations[4],
    ],
  };

  beforeAll(() => {

  });

  Object.entries(cases).map(([testName, testData]) => (
    test(`json ${testName}`, () => {
      const [path1, path2, expectation] = testData;
      expect(diff(path1, path2)).toEqual(expectation);
    })
  ));
};
