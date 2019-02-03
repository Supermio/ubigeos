import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Departamento} from '../models';
import {DepartamentoRepository} from '../repositories';

export class CldDepartamentoController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository : DepartamentoRepository,
  ) {}

  @post('/departamentos', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: {'x-ts-type': Departamento}}},
      },
    },
  })
  async create(@requestBody() departamento: Departamento): Promise<Departamento> {
    return await this.departamentoRepository.create(departamento);
  }

  @get('/departamentos/count', {
    responses: {
      '200': {
        description: 'Departamento model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where,
  ): Promise<Count> {
    return await this.departamentoRepository.count(where);
  }

  @get('/departamentos', {
    responses: {
      '200': {
        description: 'Array of Departamento model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Departamento}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Departamento)) filter?: Filter,
  ): Promise<Departamento[]> {
    return await this.departamentoRepository.find(filter);
  }

  @patch('/departamentos', {
    responses: {
      '200': {
        description: 'Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() departamento: Departamento,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where,
  ): Promise<Count> {
    return await this.departamentoRepository.updateAll(departamento, where);
  }

  @get('/departamentos/{id}', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: {'x-ts-type': Departamento}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Departamento> {
    return await this.departamentoRepository.findById(id);
  }

  @patch('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'Departamento PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() departamento: Departamento,
  ): Promise<void> {
    await this.departamentoRepository.updateById(id, departamento);
  }

  @put('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'Departamento PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() departamento: Departamento,
  ): Promise<void> {
    await this.departamentoRepository.replaceById(id, departamento);
  }

  @del('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'Departamento DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.departamentoRepository.deleteById(id);
  }
}
