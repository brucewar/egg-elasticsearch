import * as elasticsearch from 'elasticsearch';

declare module 'egg' {
  // extend app
  interface Application {
    elasticsearch: typeof elasticsearch.Client
  }
}