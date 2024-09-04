import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('DataService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new datum', () => {
      const createDatumDto: UpdateCustomerDto = {
        name: 'John Doe',
        city: 'New York',
        age: 30,
      };
      const result = service.create(createDatumDto);
      expect(result).toEqual(expect.objectContaining(createDatumDto));
    });

    it('should throw BadRequestException if required fields are missing', () => {
      const createDatumDto: Partial<UpdateCustomerDto> = {
        name: 'John Doe',
        city: 'New York',
      };

      expect(() => service.create(createDatumDto as UpdateCustomerDto)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of data', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a datum with a valid id', () => {
      const existingDatum = service.findAll()[0];
      const result = service.findOne(existingDatum.id);
      expect(result).toEqual(existingDatum);
    });

    it('should throw NotFoundException if datum not found', () => {
      expect(() => service.findOne(123456)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the datum if id is valid', () => {
      const existingDatum = service.findAll()[0];
      const updateDatumDto: Partial<UpdateCustomerDto> = {
        name: 'Jane Doe',
      };
      const result = service.update(existingDatum.id, updateDatumDto);
      expect(result.name).toBe(updateDatumDto.name);
    });

    it('should throw NotFoundException if datum not found', () => {
      expect(() => service.update(123456, {})).toThrow(NotFoundException);
    });
  });
});
