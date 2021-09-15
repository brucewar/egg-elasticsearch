'use strict';

module.exports = app => {
  if (app.config.elasticsearch.app) require('./lib/elasticsearch')(app);
};
