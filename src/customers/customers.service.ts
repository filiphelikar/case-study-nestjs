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

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  public async create(
    createDatumDto: UpdateCustomerDto,
  ): Promise<CreateCustomerDto> {
    if (createDatumDto.age && createDatumDto.city && createDatumDto.name) {
      const newData: UpdateCustomerDto = {
        name: createDatumDto.name,
        age: createDatumDto.age,
        city: createDatumDto.city,
      };

      await this.customerRepository.create(newData);
      return this.customerRepository.save(newData);
    }

    throw new BadRequestException('Bad Request');
  }

  public findAll(): Promise<CreateCustomerDto[]> {
    return this.customerRepository.find();
  }

  public async findOne(id: number): Promise<CreateCustomerDto> {
    const findCustomer: CreateCustomerDto =
      await this.customerRepository.findOneBy({ id });

    if (!findCustomer) throw new NotFoundException('Customer not found');

    return findCustomer;
  }

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
