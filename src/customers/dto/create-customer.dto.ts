import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'ID of the customer' })
  id: number;

  @ApiProperty({ description: 'Name of the customer' })
  name: string;

  @ApiProperty({ description: 'City of the customer' })
  city: string;

  @ApiProperty({ description: 'Age of the customer', example: 25 })
  age: number;
}
