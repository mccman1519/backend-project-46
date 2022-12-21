export default (arrayDiff) => {
  const spacing = '  ';

  return arrayDiff.reduce((result, item) => {
    const [feature, key, value] = item;
    return `${result}\n${spacing}${feature} ${key}: ${value}`;
  }, '');
};
