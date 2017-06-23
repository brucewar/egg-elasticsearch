# egg-elasticsearch

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-elasticsearch.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-elasticsearch
[travis-image]: https://img.shields.io/travis/eggjs/egg-elasticsearch.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-elasticsearch
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-elasticsearch.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-elasticsearch?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-elasticsearch.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-elasticsearch
[snyk-image]: https://snyk.io/test/npm/egg-elasticsearch/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-elasticsearch
[download-image]: https://img.shields.io/npm/dm/egg-elasticsearch.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-elasticsearch

<!--
Description here.
-->

## Install

```bash
$ npm i egg-elasticsearch --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.elasticsearch = {
  enable: true,
  package: 'egg-elasticsearch',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.elasticsearch = {
  host: 'localhost:9200',
  apiVersion: '5.4'
};
```

Refer to [elasticsearch doc](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html) for more options;

## Example

<!-- example here -->
```js
// app/controller/post.js

module.exports = app => {
  return class PostController extends app.Controller {
    * index(){
      const pageNum = this.ctx.params.page;
      const perPage = this.ctx.params.per_page;
      const userQuery = this.ctx.request.body.search_query;
      const userId = this.ctx.session.userId;
      const posts = app.elasticsearch.search({
        index: 'posts',
        from: (pageNum - 1) * perPage,
        size: perPage,
        body: {
          query: {
            filtered: {
              query: {
                match: {
                  _all: userQuery
                }
              },
              filter: {
                or: [
                  {
                    term: { privacy: 'public' }
                  }, {
                    term: { owner: userId }
                  }
                ]
              }
            }
          }
        }
      });
      this.ctx.body = posts;
    }
  }
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
