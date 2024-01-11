import {createDirectory} from './createDirectory.js';
import {downloadFile} from './downloadFile.js';
import got from 'got';

export const copyRemainingFiles = async (
  starter,
  destination
) => {
  if (destination !== '.') {
    createDirectory(`${destination}/`);
    createDirectory(`${destination}/stories/`);
    destination = `${destination}/stories/`;
  }
  let downloadPromises = [];

  let res = await got('https://api.github.com/repos/adobe/react-spectrum/contents/starters?ref=create-react-aria-components').catch((e) => e);
  let sha = JSON.parse(res.body).find(s => s.name === starter).sha;

  let trees = await got(`https://api.github.com/repos/adobe/react-spectrum/git/trees/${sha}?recursive=1`).catch((e) => e);
  let files = JSON.parse(trees.body).tree.filter(file => file.type === 'blob' && !file.path.includes('stories') && !file.path.includes('src'));
  downloadPromises.push(...files.map(file => downloadFile(file.url, `${destination}/${file.path}`)));

  await Promise.all(downloadPromises);
  console.log('All components downloaded successfully!');
};
