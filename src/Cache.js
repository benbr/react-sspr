import fetch from 'isomorphic-fetch';

const getServerSideData = async (urls) => {
  let dataUrls = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const url of urls) {
    let usableURL = url;
    let processURL = null;

    if (url.url && url.processURL) {
      usableURL = url.url;
      processURL = url.processURL;
    }

    let ret = {};

    // eslint-disable-next-line no-await-in-loop
    const data = await fetch(usableURL)
      .then((r) => r.json())
      .catch((err) => {
        throw new Error(err);
      });

    // Check Data Source and return correct key as URL to fetch Client Side
    if (processURL) {
      // eslint-disable-next-line no-await-in-loop
      ret = await processURL(data);
    } else {
      ret[url] = data;
    }
    dataUrls = { ...dataUrls, ...ret };
  }
  return dataUrls;
};

/**
 * Fetch and process data from external sources for caching purposes
 * @returns {Promise<{}>}
 */
const resolveUrls = (urls) => getServerSideData(urls);

/**
 * Holds the server-side data cache
 */
export function makeExternalDataCache(urls) {
  let cache = {};

  /**
     * used to pass data from react to server then to client
     * @type {{}}
     */
  let currentRender = {};

  const _fetch = () => {
    resolveUrls(urls).then((d) => {
      cache = d;
    });
  };

  const resetCurrentRender = () => {
    currentRender = {};
  };

  /**
     * the currentRender is reset after being read
     * @returns {{}}
     */
  const renderStaticSSPR = () => {
    const returnableRender = { ...currentRender };
    resetCurrentRender();
    return `<script>window._SSPR_DATA_=${JSON.stringify(returnableRender)}</script>`;
  };

  const getCache = () => cache;

  const getCurrentRender = () => currentRender;
  const refresh = () => { _fetch(); };
  _fetch();

  return {
    renderStaticSSPR, getCache, getCurrentRender, refresh,
  };
}
