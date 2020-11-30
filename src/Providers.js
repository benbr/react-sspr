import React from 'react';
import { SSPRDataProvider } from './Context';
import { cache } from './Cache';

export function SSPRServerProvider({ ...props }) {
  return (
    <SSPRDataProvider
      context={cache.getCache()}
      currentRender={cache.getCurrentRender()}
      {...props}
    />
  );
}

export function SSPRClientProvider(props) {
  // eslint-disable-next-line no-underscore-dangle
  const SSPRInitialData = (typeof window !== 'undefined') ? window._SSPR_DATA_ : {};

  return (
    <SSPRDataProvider
      context={SSPRInitialData}
      {...props}
    />
  );
}
