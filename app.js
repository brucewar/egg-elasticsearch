'use strict';

module.exports = app => {
  require('./lib/elasticsearch')(app);
};
