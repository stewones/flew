importScripts('parse.min.js');
importScripts('reative.js');

var localStorageData = {};
var localStorage = {
  getItem: key => localStorageData[key],
  setItem: (key, val) => (localStorageData[key] = val)
};

onmessage = req => {
  const data = req.data || {};
  const appID = data.appID;
  const serverURL = data.serverURL;
  const key = data.key;
  const chain = data.chain;
  const collection = data.collection;
  const skipOnOperator = data.skipOnOperator;
  const skipOnQuery = data.skipOnQuery;
  const specialOperators = data.specialOperators;

  Parse.initialize(appID);
  Parse.serverURL = serverURL;

  const success = r => {
    const data = r.data;
    const result = [];

    for (const item of data) {
      const entry = item && !chain.useObject ? item.toJSON() : item;
      if (!chain.useObject) {
        // @todo add id for nested results
        entry.id = entry.objectId;
      }
      result.push(entry);
    }

    // success callback
    postMessage({ key: key, collection: collection, data: result });
  };

  const error = err => {
    postMessage({ key: key, collection: collection, error: err });
  };

  reative.find({
    Parse: Parse,
    chain: chain,
    collection: collection,
    skipOnQuery: skipOnQuery,
    skipOnOperator: skipOnOperator,
    specialOperators: specialOperators,
    success: r => success(r),
    error: err => error(err)
  });
};
