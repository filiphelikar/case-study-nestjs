import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomerDto: CreateCustomerDto = {
    id: 4417897438904320,
    name: 'Paulette Walsh',
    city: 'Pasadena',
    age: 36,
  };
  const mockCreateCustomerDto: UpdateCustomerDto = {
    name: 'Naomi O Reilly',
    city: 'Lake Demarcus',
    age: 18,
  };

  const mockCustomersService = {
    create: jest.fn().mockResolvedValue(mockCustomerDto),
    findAll: jest.fn().mockResolvedValue([mockCustomerDto]),
    findOne: jest.fn().mockResolvedValue(mockCustomerDto),
    update: jest.fn().mockResolvedValue(mockCustomerDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  describe('create', () => {
    it('should create a customer', async () => {
      expect(await controller.create(mockCreateCustomerDto)).toBe(
        mockCustomerDto,
      );
      expect(mockCustomersService.create).toHaveBeenCalledWith(
        mockCreateCustomerDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      expect(await controller.findAll()).toEqual([mockCustomerDto]);
      expect(mockCustomersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const id = 1;
      expect(await controller.findOne(id)).toBe(mockCustomerDto);
      expect(mockCustomersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const id = 1;
      expect(await controller.update(id, mockCreateCustomerDto)).toBe(
        mockCustomerDto,
      );
      expect(mockCustomersService.update).toHaveBeenCalledWith(
        id,
        mockCreateCustomerDto,
      );
    });
  });
});
