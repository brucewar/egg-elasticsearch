'use strict';

module.exports = app => {
  app.get('/', function* () {
    const ret = yield app.elasticsearch.search({
      q: 'pants',
    });
    this.body = ret;
  });
};
