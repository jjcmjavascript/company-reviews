import { Test } from '@nestjs/testing';

import { ReportedCompanyController } from '@modules/reported-company/reported-company.controller';
import { ReportedCompanyIndexService } from '@modules/reported-company/service/reported-company-index.service';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { ReportedCompanyIndexQuery } from '@shared/services/queries/reported-company-index.query';
import {
  ReportedCompanyCreateDto,
  ReportedCompanyIndexServiceDto,
} from '@modules/reported-company/reported-company.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ReportedCompanyCreateService } from '@modules/reported-company/service/reported-company-create.service';
import { ReportedCompany } from '@shared/entities/reported-company.entity';
import { ReportedCompanyCreateRepository } from '@modules/reported-company/repositories/reported-company-create.repository';
import { mockDeep } from 'jest-mock-extended';

const prismaMock = mockDeep<PrismaService>();
const globalRef = Test.createTestingModule({
  providers: [
    {
      provide: PrismaService,
      useValue: prismaMock,
    },
    ReportedCompanyIndexQuery,
    ReportedCompanyCreateRepository,
    ReportedCompanyIndexService,
    ReportedCompanyCreateService,
  ],
  controllers: [ReportedCompanyController],
}).compile();

describe('[Controller] ReportedCompanyController (Index - Get)', () => {
  let controller: ReportedCompanyController;
  let service: ReportedCompanyIndexService;
  let query: ReportedCompanyIndexQuery;

  beforeAll(async () => {
    const ref = await globalRef;
    controller = ref.get(ReportedCompanyController);
    service = ref.get(ReportedCompanyIndexService);
    query = ref.get(ReportedCompanyIndexQuery);
  });

  it('ReportedCompanyController should transform string to number', async () => {
    const params = plainToClass(ReportedCompanyIndexServiceDto, {
      from: 'asdf',
    });

    jest.spyOn(query, 'execute').mockImplementation(async () => []);

    const controllerSpy = jest.spyOn(controller, 'index');

    const serviceSpy = jest.spyOn(service, 'execute');

    const response = await controller.index(params);

    expect(controllerSpy).toHaveBeenCalledWith(params);

    expect(serviceSpy).toHaveBeenCalledWith({ id: 0 });

    expect(response).toEqual({});
  });

  it('ReportedCompanyController(Index) When a number is not provided should use 0', async () => {
    const params = plainToClass(ReportedCompanyIndexServiceDto, {});

    jest.spyOn(query, 'execute').mockImplementation(async () => []);

    const controllerSpy = jest.spyOn(controller, 'index');

    const serviceSpy = jest.spyOn(service, 'execute');

    const response = await controller.index(params);

    expect(controllerSpy).toHaveBeenCalledWith(params);

    expect(serviceSpy).toHaveBeenCalledWith({ id: 0 });

    expect(response).toEqual({});
  });
});

describe('[Controller] ReportedCompanyController (Index - Create)', () => {
  let controller: ReportedCompanyController;
  let createService: ReportedCompanyCreateService;

  beforeAll(async () => {
    const ref = await globalRef;

    controller = ref.get(ReportedCompanyController);
    createService = ref.get(ReportedCompanyCreateService);
  });

  it('Should be defined', () => {
    expect(controller.create).toBeDefined();
  });

  it('Should be calle with params', async () => {
    const spyOnCreate = jest.spyOn(controller, 'create');
    const spyCreateService = jest.spyOn(createService, 'execute');
    const params = {
      name: 'Company 1',
      tax: '2700909123',
      description: 'compamny equis',
      image: 'image.jpg',
    };

    spyCreateService.mockImplementation(async () => {
      return ReportedCompany.create({
        id: 1,
        ...params,
      });
    });

    await controller.create(params);

    expect(spyOnCreate).toHaveBeenCalledTimes(1);
    expect(spyOnCreate).toHaveBeenCalledWith(params);
  });

  it('Should throw Error if has invalid data', async () => {
    const params = {
      name: 12,
      tax: 2700909123,
      description: '',
      image: '',
    };

    const paramsDto = plainToClass(ReportedCompanyCreateDto, params);
    const validatedData = await validate(paramsDto);

    expect(validatedData).toHaveLength(4);

    expect(validatedData[0].constraints).toHaveProperty('isString');

    expect(validatedData[1].constraints).toHaveProperty('isString');

    expect(validatedData[2].constraints).toHaveProperty('minLength');

    expect(validatedData[3].constraints).toHaveProperty('minLength');
  });

  it('Should return a valid created ReportedCompany', async () => {
    const params = {
      name: 'Company 1',
      tax: '2700909123',
      description: 'compamny equis',
      image: 'image.jpg',
      createdAt: new Date(),
    };
    const spyCreateService = jest.spyOn(createService, 'execute');

    spyCreateService.mockImplementation(async () => {
      return ReportedCompany.create({
        id: 1,
        ...params,
      });
    });

    const result = await controller.create(params);

    expect(result.values).toEqual({ ...params, id: 1 });
  });
});
