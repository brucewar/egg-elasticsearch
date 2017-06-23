'use strict';

module.exports = agent => {
  require('./lib/elasticsearch')(agent);
};
