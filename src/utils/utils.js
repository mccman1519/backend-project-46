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

export {
  getFileType,
  getCompareMode,
};
