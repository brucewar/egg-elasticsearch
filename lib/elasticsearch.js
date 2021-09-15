'use strict';

const assert = require('assert');
const elasticsearch = require('elasticsearch');

module.exports = app => {
  const config = app.config.elasticsearch;
  assert(config.host || config.hosts, '[egg-elasticsearch] \'host\' or \'hosts\' is required on config');

  app.coreLogger.info('[egg-elasticsearch] connecting elasticsearch server');

  const client = new elasticsearch.Client(config);

  Object.defineProperty(app, 'elasticsearch', {
    value: client,
    writable: false,
    configurable: false,
  });

  app.beforeStart(async () => {
    try {
      await client.ping({ requestTimeout: 30000 });
      app.coreLogger.info('[egg-elasticsearch] elasticsearch connects successfully');
    } catch (err) {
      app.coreLogger.error('[egg-elasticsearch] elasticsearch cluster is down with error: ' + err);
    }
  });
};
