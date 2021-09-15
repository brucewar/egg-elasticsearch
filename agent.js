'use strict';

module.exports = agent => {
  if (agent.config.elasticsearch.agent) require('./lib/elasticsearch')(agent);
};
