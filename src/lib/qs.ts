import qs from 'querystring';

export const getQuerystring = () => {
  if (typeof window !== 'undefined') {
    return window.location.search
      ? qs.parse(window.location.search.slice(1))
      : {};
  }
  return {};
};
