import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
    type: CreateCustomerDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public create(
    @Body() createCustomerDto: UpdateCustomerDto,
  ): CreateCustomerDto {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'List of customers',
    type: [CreateCustomerDto],
  })
  public findAll(): CreateCustomerDto[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({
    status: 200,
    description: 'The customer with the given ID.',
    type: CreateCustomerDto,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  public findOne(@Param('id') id: number): CreateCustomerDto {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated customer.',
    type: CreateCustomerDto,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  public update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): CreateCustomerDto {
    return this.customersService.update(+id, updateCustomerDto);
  }
}
