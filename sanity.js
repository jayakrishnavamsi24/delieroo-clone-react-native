import 'url-search-params-polyfill';
import 'react-native-url-polyfill/auto';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
    projectId: "17w1cwfn",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
};
  
const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

