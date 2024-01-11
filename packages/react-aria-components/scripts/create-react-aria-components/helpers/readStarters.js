import got from 'got';

export const readTemplates = async () => {
  let res = await got('https://api.github.com/repos/adobe/react-spectrum/contents/starters?ref=create-react-aria-components').catch((e) => e);
  // TODO handle error
  return JSON.parse(res.body).map((t) => t.name);
};
