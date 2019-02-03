import {Entity, model, property} from '@loopback/repository';

@model({settings: {"strict":false}})
export class Departamento extends Entity {
  @property({
    type: 'string',
  })
  ubipais?: string;

  @property({
    type: 'string',
    id: true,
    required: true,
  })
  ubigeo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}
