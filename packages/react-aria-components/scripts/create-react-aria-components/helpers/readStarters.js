import got from 'got';

export const readStarters = async () => {
  let res = await got('https://api.github.com/repos/adobe/react-spectrum/contents/starters').catch((e) => {
    console.error(e);
    process.exit(1);
  });
  return JSON.parse(res.body).map((t) => t.name);
};
