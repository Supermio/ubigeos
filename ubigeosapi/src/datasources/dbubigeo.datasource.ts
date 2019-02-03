import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './dbubigeo.datasource.json';

export class DbubigeoDataSource extends juggler.DataSource {
  static dataSourceName = 'dbubigeo';

  constructor(
    @inject('datasources.config.dbubigeo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
