import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

// Service for managing customers
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /**
   * Create a new customer.
   * @param createDatumDto - Data for creating the customer
   * @returns The created customer
   * @throws BadRequestException if required data is missing
   */
  public async create(
    createDatumDto: UpdateCustomerDto,
  ): Promise<CreateCustomerDto> {
    // Ensure all required fields are provided
    if (createDatumDto.age && createDatumDto.city && createDatumDto.name) {
      const newData: UpdateCustomerDto = {
        name: createDatumDto.name,
        age: createDatumDto.age,
        city: createDatumDto.city,
      };

      // Save the new customer
      await this.customerRepository.create(newData);
      return this.customerRepository.save(newData);
    }

    throw new BadRequestException('Bad Request');
  }

  /**
   * Get all customers.
   * @returns List of customers
   */
  public findAll(): Promise<CreateCustomerDto[]> {
    return this.customerRepository.find();
  }

  /**
   * Get a customer by ID.
   * @param id - Customer ID
   * @returns The customer
   * @throws NotFoundException if the customer is not found
   */
  public async findOne(id: number): Promise<CreateCustomerDto> {
    const findCustomer: CreateCustomerDto =
      await this.customerRepository.findOneBy({ id });

    if (!findCustomer) throw new NotFoundException('Customer not found');

    return findCustomer;
  }

  /**
   * Update a customer by ID.
   * @param id - Customer ID
   * @param updateDatumDto - Data to update the customer
   * @returns The updated customer
   * @throws BadRequestException if no fields are provided to update
   */
  public async update(
    id: number,
    updateDatumDto: Partial<UpdateCustomerDto>,
  ): Promise<CreateCustomerDto> {
    if (!updateDatumDto.name && !updateDatumDto.age && !updateDatumDto.city)
      throw new BadRequestException(
        'At least one field (name, age, city) must be provided.',
      );

    const newData: Partial<UpdateCustomerDto> = {
      name: updateDatumDto.name,
      age: updateDatumDto.age,
      city: updateDatumDto.city,
    };

    await this.customerRepository.update({ id }, { ...newData });

    return this.findOne(id);
  }
}
