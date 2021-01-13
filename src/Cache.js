import fetch from 'isomorphic-fetch';

const getData = async (url) => {
  const data = await fetch(url)
    .then((r) => r.json())
    .catch((err) => {
      console.log(`Error fetching sspr data for ${url} : ${err}`);
    });

  return data;
};

/**
 * Holds the server-side data cache
 */
function makeExternalDataCache() {
  const cache = {};
  const dataSources = [];

  /**
     * used to pass data from react to server then to client
     * @type {{}}
     */
  let currentRender = {};

  const addURL = async (url, processURL = false) => {
    dataSources.push({
      url,
      processURL,
    });
    const data = await getData(url);
    if (processURL) {
      const processedData = processURL(data);
      Object.keys(processedData).forEach((pURL) => {
        cache[pURL] = processedData[pURL];
      });
    } else {
      cache[url] = data;
    }
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
  const refresh = () => {
    dataSources.forEach((source) => {
      addURL(source.url, source.processURL);
    });
  };

  return {
    renderStaticSSPR, getCache, getCurrentRender, refresh, addURL,
  };
}

const cache = makeExternalDataCache();
const renderStaticSSPR = () => cache.renderStaticSSPR();
const addURL = (url, process) => cache.addURL(url, process);
const refreshSSPRCache = () => {
  cache.refresh();
};
const { getCache } = cache;

export {
  getCache, renderStaticSSPR, addURL, refreshSSPRCache,
};
