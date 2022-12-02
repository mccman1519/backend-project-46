import fs from 'fs';
import yaml from 'js-yaml';

const parseJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const parseYAML = (filePath) => {
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    throw new Error(e);
  }
};

export {
  parseJSON,
  parseYAML,
};
