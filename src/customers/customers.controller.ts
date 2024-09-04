import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  public create(
    @Body() createCustomerDto: UpdateCustomerDto,
  ): CreateCustomerDto {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  public findAll(): CreateCustomerDto[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: number): CreateCustomerDto {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): CreateCustomerDto {
    return this.customersService.update(+id, updateCustomerDto);
  }
}
