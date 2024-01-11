import {createDirectory} from './createDirectory.js';
import {downloadFile} from './downloadFile.js';
import got from 'got';

export const copyComponents = async (
  components,
  starter,
  destination
) => {
  if (destination !== '.') {
    createDirectory(`${destination}/`);
    createDirectory(`${destination}/src/`);
    destination = `${destination}/src/`;
  }
  let downloadPromises = [];

  await Promise.all(components.map(async (component) => {

    let res = await got(`https://api.github.com/repos/adobe/react-spectrum/contents/starters/${starter}/src/${component}`).catch((e) => e);
    let files = JSON.parse(res.body).filter(file => file.type === 'file');
    downloadPromises.push(...files.map(file => downloadFile(file.download_url, `${destination}/${file.name}`)));
  }));
  await Promise.all(downloadPromises);
  console.log('All components downloaded successfully!');
};
