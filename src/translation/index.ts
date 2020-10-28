import { Resource } from 'i18next';
import * as common from './common';
import * as findDiff from './findDiff';
import * as whoIsThis from './whoIsThis';

const dataList = [common, findDiff, whoIsThis];
export const resources: {
  ko: Resource;
  en: Resource;
} = {
  ko: {
    translation: {},
  },
  en: {
    translation: {},
  },
};

dataList.forEach((data) => {
  Object.keys(data).forEach((key: keyof typeof data) => {
    const resource = data[key];
    Object.keys(resource).forEach((t: keyof typeof resource) => {
      const props = resource[t];
      Object.assign(resources[key][t], props);
    });
  });
});
