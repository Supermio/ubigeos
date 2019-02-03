import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Departamento} from '../models';
import {DbubigeoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.ubipais
> {
  constructor(
    @inject('datasources.dbubigeo') dataSource: DbubigeoDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
