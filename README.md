# Usage

We need to create a cache on the server that will hold the external data,
and configure the Providers that make the data accessible in the app

## In the server rendering
Create a cache instance

```js
import {makeExternalDataCache} from 'react-sspr';

const urls = ["https://a-prefetched-url", "..."];

const cache = makeExternalDataCache(urls);
```
Where `urls` is an array of URLs to prefetch.

*This array should be removed to have urls dynamically retrieved in a future version*

Wrap the app with `SSPRServerProvider`
```jsx 
import {SSPRClientProvider, makeExternalDataCache} from 'react-sspr';

const urls = ["https://a-prefetched-url", "..."];

const cache = makeExternalDataCache(urls);

<SSPRClientProvider cache={cache}>
    <YourApp/>
</SSPRClientProvider>
```

## In client react
Wrap the app with `SSPRClientProvider`
```jsx 
<SSPRClientProvider>
    <YourApp/>
</SSPRClientProvider>
```

Simply use the useSSPR hook : 
```js
 const rawCity = useSSPR('https://a-prefetched-url');
```

*This is enough to have external data prefetched and filled in the html, for SEO purpose for example.*

To avoid having a state change on the client side when the data is refetched during hydration,
add this to your generated html :
```js
import {renderStaticSSPR} from 'react-sspr';

const ssprData = renderStaticSSPR();

// ...
// in the html template :
<body>
{ssprData}
//...
```

This is going to pass the prefetched data (only the bit that is currently needed, not the whole cache) to the client through the html.
No refetch is then needed on the client.

# Refreshing the cache
The cache is refreshed with every server restart.
You can also trigger a refresh using `cache.refresh()`

Example with an Express server and a route to trigger a refresh :
```js
import {makeExternalDataCache} from 'react-sspr';

const urls = ["https://a-prefetched-url", "..."];

const cache = makeExternalDataCache(urls);

app.get('/refetch-external-data-cache', (req, res) => {
  cache.refresh();
});

```