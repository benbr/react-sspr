import React, { useState, createContext, useRef } from 'react';
import fetch from 'isomorphic-fetch';

export const SSRPDataContext = createContext({});

/**
 * Holds and serves the whole SSPR prefetched data.
 * This is then used by useSSPR to render the components.
 * The data shouldn't be used without useSSPR.
 */
export function SSPRDataProvider({
  context = {},
  currentRender = false,
  ...props
}) {
  const [data, setData] = useState(context);
  const fetchQueue = useRef([]);

  const fetchData = async (url) => {
    // eslint-disable-next-line no-bitwise
    if (~fetchQueue.current.indexOf(url)) {
      return;
    }
    fetchQueue.current.push(url);
    let urlData = await fetch(url);
    urlData = await urlData.json();
    setData((oldData) => ({ ...oldData, [url]: urlData }));
  };

  /**
   * returns the data if it exists, or returns null and calls for a fetch.
   * @param url
   * @returns {null|object}
   */
  const getData = (url) => {
    if (data[url]) {
      if (currentRender) {
        // used server-side to gather useful URLs and passed them through html
        // eslint-disable-next-line no-param-reassign
        currentRender[url] = data[url];
      }
      return data[url];
    }
    fetchData(url);
    return null;
  };

  return <SSRPDataContext.Provider value={{ data, getData }} {...props} />;
}
