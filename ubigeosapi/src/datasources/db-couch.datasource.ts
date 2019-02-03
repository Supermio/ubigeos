import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './db-couch.datasource.json';

export class DbCouchDataSource extends juggler.DataSource {
  static dataSourceName = 'dbCouch';

  constructor(
    @inject('datasources.config.dbCouch', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
