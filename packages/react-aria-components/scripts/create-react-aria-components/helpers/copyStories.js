import {createDirectory} from './createDirectory.js';
import {downloadFile} from './downloadFile.js';
import got from 'got';

export const copyStories = async (
  components,
  starter,
  destination
) => {
  if (destination !== '.') {
    createDirectory(`${destination}/`);
    createDirectory(`${destination}/stories/`);
    destination = `${destination}/stories/`;
  }
  let downloadPromises = [];
  await Promise.all(components.map(async (component) => {
    let res = await got(`https://api.github.com/repos/adobe/react-spectrum/contents/starters/${starter}/stories/${component.replace('.', '.stories.')}`).catch((e) => {
      console.error(e);
      process.exit(1);
    });
    let files = JSON.parse(res.body).filter(file => file.type === 'file');
    downloadPromises.push(...files.map(file => downloadFile(file.download_url, `${destination}/stories/${file.name}`)));
  }));
  await Promise.all(downloadPromises);
  console.log('All components downloaded successfully!');
};
