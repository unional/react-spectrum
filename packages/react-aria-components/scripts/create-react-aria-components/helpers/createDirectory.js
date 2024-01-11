import fs from 'fs';

export const createDirectory = (projectName) => {
  if (!fs.existsSync(projectName)) {
    try {
      fs.mkdirSync(projectName);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};
