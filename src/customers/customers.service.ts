import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { faker } from '@faker-js/faker';

const fakeData: CreateCustomerDto[] = Array.from({ length: 20 }, () => {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    city: faker.location.city(),
    age:
      new Date().getFullYear() -
      faker.date.birthdate({ min: 12, max: 45, mode: 'age' }).getFullYear(),
  };
});

@Injectable()
export class CustomersService {
  public create(createDatumDto: UpdateCustomerDto): CreateCustomerDto {
    if (createDatumDto.age && createDatumDto.city && createDatumDto.name) {
      const newData: CreateCustomerDto = {
        id: faker.number.int(),
        name: createDatumDto.name,
        age: createDatumDto.age,
        city: createDatumDto.city,
      };

      fakeData.push(newData);
      return newData;
    }

    throw new BadRequestException('Bad Request');
  }

  public findAll() {
    return fakeData;
  }

  public findOne(id: number): CreateCustomerDto {
    const findCustomer: CreateCustomerDto = fakeData.find(
      (customer) => customer.id == id,
    );

    if (!findCustomer) throw new NotFoundException('Customer not found');

    return findCustomer;
  }

  public update(
    id: number,
    updateDatumDto: Partial<UpdateCustomerDto>,
  ): CreateCustomerDto {
    const index: number = fakeData.findIndex((customer) => customer.id == id);

    if (index == -1) throw new NotFoundException('Customer not found');

    fakeData[index] = {
      ...fakeData[index],
      ...updateDatumDto,
    };

    return fakeData[index];
  }
}
