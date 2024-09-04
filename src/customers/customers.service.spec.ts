import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const mockCustomerRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
};

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a new customer', async () => {
      const createDto: UpdateCustomerDto = {
        name: 'John Doe',
        age: 30,
        city: 'New York',
      };

      const createdCustomer = {
        ...createDto,
      };

      mockCustomerRepository.create.mockReturnValue(createdCustomer);
      mockCustomerRepository.save.mockResolvedValue(createdCustomer);

      const result = await service.create(createDto);

      expect(mockCustomerRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockCustomerRepository.save).toHaveBeenCalledWith(createdCustomer);
      expect(result).toEqual(createdCustomer);
    });

    it('should throw BadRequestException if required fields are missing', async () => {
      const createDto: UpdateCustomerDto = {
        name: 'John Doe',
        age: null,
        city: 'New York',
      };

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      const customers: CreateCustomerDto[] = [
        { id: 1, name: 'John Doe', age: 30, city: 'New York' },
        { id: 2, name: 'Jane Doe', age: 25, city: 'Los Angeles' },
      ];

      mockCustomerRepository.find.mockResolvedValue(customers);

      const result = await service.findAll();
      expect(mockCustomerRepository.find).toHaveBeenCalled();
      expect(result).toEqual(customers);
    });
  });

  describe('findOne', () => {
    it('should return a customer by ID', async () => {
      const customer: CreateCustomerDto = {
        id: 1,
        name: 'John Doe',
        age: 30,
        city: 'New York',
      };

      mockCustomerRepository.findOneBy.mockResolvedValue(customer);

      const result = await service.findOne(1);

      expect(mockCustomerRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockCustomerRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the updated customer', async () => {
      const updateDto: Partial<UpdateCustomerDto> = {
        name: 'Updated Name',
      };

      const updatedCustomer: CreateCustomerDto = {
        id: 1,
        name: 'Updated Name',
        age: 30,
        city: 'New York',
      };

      mockCustomerRepository.update.mockResolvedValue(null);
      mockCustomerRepository.findOneBy.mockResolvedValue(updatedCustomer);

      const result = await service.update(1, updateDto);

      expect(mockCustomerRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        { ...updateDto },
      );
      expect(mockCustomerRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(updatedCustomer);
    });

    it('should throw BadRequestException if no fields are provided for update', async () => {
      const updateDto: Partial<UpdateCustomerDto> = {};

      await expect(service.update(1, updateDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
