/* eslint-disable import/prefer-default-export */
import path from 'path';

const getFileType = (filePath) => {
  const ext = path.extname(filePath);

  if (ext === '.yml' || ext === '.yaml') return 'yaml';
  if (ext === '.json') return 'json';

  // Unsupported:
  return ext.slice(1);
};

const getCompareMode = (fileType1, fileType2) => {
  if (fileType1 !== fileType2) {
    throw new Error('Cannot compare two different types of files');
  }
  return fileType1;
};

const getExactType = (value) => ({}.toString).call(value).slice(8, -1);

const isRealObject = (value) => getExactType(value) === 'Object';

const arrayToStrDeep = (array) => {
  let first = true;
  const result = array.map(item => {
    // Is replaceble with Array.isArray()?
    if (getExactType(item) !== 'Array') {      
      return `${first ? (first = false, '') : ''}${item}`;
    }
    return `${first ? (first = false, '') : ''}${arrayToStrDeep(item)}`;
  });

  return `[${result}]`;  
};

const stringify = (data, spacer = ' ', spacesCount = 2) => {
  if (typeof data !== 'object') return data.toString(); // dead code?
  const initCount = spacesCount;
  
  const proc = (data, spacer, spacesCount) => {
    let spaces = spacer.repeat(spacesCount);
    const result = Object.entries(data).reduce((acc, [key, value]) => {  
      const valueType = getExactType(value);
      
      if (valueType === 'Object') {
        return `${acc}${spaces}${key}: ${proc(value, spacer, spacesCount + 4)}\n`;
      }
      
      let ret = `${value}`;
      if (valueType === 'Array') {
        ret = `${arrayToStrDeep(value)}`;
      }
      
      return `${acc}${spaces}${key}: ${ret}\n`;
    }, '');
    // Исправить пробелы перед закрывающей скобкой
    spaces = spacer.repeat(spacesCount - 4);
    return `{\n${result}${spaces}}`;
  };
  return proc(data, spacer, initCount);
};

export {
  getFileType,
  getExactType,
  getCompareMode,
  isRealObject,
  stringify,
};
