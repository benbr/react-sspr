import React, { useContext } from 'react';
import { SSRPDataContext } from './Context';

/**
 * Used by components to get async data : prefetched on the server and refetched on the client
 * through SSRDataProvider.
 * @param url
 * @returns {null|object}
 */
export default function useSSPR(url) {
  const { getData, data } = useContext(SSRPDataContext);
  const [urlData, setUrlData] = React.useState(getData(url));

  React.useEffect(() => {
    setUrlData(getData(url));
  }, [Object.keys(data)]);

  return urlData;
}
