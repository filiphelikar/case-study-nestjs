import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  // Sample customer data for testing
  const mockCustomer: UpdateCustomerDto = {
    name: 'John Doe',
    age: 30,
    city: 'New York',
  };
  const updatedCustomer: UpdateCustomerDto = {
    name: 'Jane Doe',
    age: 32,
    city: 'Los Angeles',
  };
  const customersArray: UpdateCustomerDto[] = [mockCustomer];

  // Mock implementation of the CustomersService
  const mockCustomersService = {
    create: jest.fn().mockResolvedValue(mockCustomer),
    findAll: jest.fn().mockResolvedValue(customersArray),
    findOne: jest.fn().mockResolvedValue(mockCustomer),
    update: jest.fn().mockResolvedValue(updatedCustomer),
  };

  // Setup before each test
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

  // Test if controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Tests for the 'create' method
  describe('create', () => {
    it('should create a new customer', async () => {
      const createDto: UpdateCustomerDto = {
        name: 'John Doe',
        age: 30,
        city: 'New York',
      };
      await expect(controller.create(createDto)).resolves.toEqual(mockCustomer);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  // Tests for the 'findAll' method
  describe('findAll', () => {
    it('should return an array of customers', async () => {
      await expect(controller.findAll()).resolves.toEqual(customersArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  // Tests for the 'findOne' method
  describe('findOne', () => {
    it('should return a single customer', async () => {
      const id = 1;
      await expect(controller.findOne(id)).resolves.toEqual(mockCustomer);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  // Tests for the 'update' method
  describe('update', () => {
    it('should update and return the updated customer', async () => {
      const id = 1;
      const updateDto: UpdateCustomerDto = {
        name: 'Jane Doe',
        age: 32,
        city: 'Los Angeles',
      };
      await expect(controller.update(id, updateDto)).resolves.toEqual(
        updatedCustomer,
      );
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });
  });
});
