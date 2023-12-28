import { ApiProperty } from '@nestjs/swagger';

export class SearchBootcampsResponse {
  @ApiProperty({
    example: 'b6a5cf9b-4585-4df9-b075-3f2e61689499',
    description: 'Bootcamp Id',
  })
  id: string;

  @ApiProperty({ example: 'Bootcamp Name', description: 'Bootcamp Name' })
  name: string;

  @ApiProperty({
    example: 'Description of the bootcamp.',
    description: 'Bootcamp Description',
  })
  description: string;

  @ApiProperty({
    example: 'http://bootcamp-url.com',
    description: 'Bootcamp URL',
  })
  url: string;

  @ApiProperty({
    example: 'http://facebook.com/bootcamp',
    description: 'Facebook URL',
  })
  facebook_url: string;

  @ApiProperty({
    example: 'http://instagram.com/bootcamp',
    description: 'Instagram URL',
  })
  instragram_url: string;

  @ApiProperty({ example: false, description: 'Is the bootcamp endorsed?' })
  is_endorsed: boolean;

  @ApiProperty({ example: 'Endorsed by XYZ', description: 'Endorsed By' })
  endorsed_by: string;

  @ApiProperty({ example: true, description: 'Is the bootcamp verified?' })
  is_verified: boolean;

  @ApiProperty({ example: 4.5, description: 'Bootcamp Score' })
  score: number;

  @ApiProperty({ example: 'Country Name', description: 'Country Name' })
  country_name: string;

  @ApiProperty({ example: 'US', description: 'Country ISO Code' })
  country_iso: string;

  @ApiProperty({
    example: 'virtual',
    enum: ['virtual', 'presencial', 'hibrido'],
    description: 'Bootcamp Mode',
  })
  mode: string;

  @ApiProperty({
    example: 'bootcamp@example.com',
    description: 'Bootcamp Email',
  })
  email: string;

  @ApiProperty({ example: '123456789', description: 'Bootcamp Phone Number' })
  phone: string;

  @ApiProperty({
    example: 'user123',
    description: 'User Id associated with the bootcamp',
  })
  user_id: string;

  @ApiProperty({ example: true, description: 'Is the bootcamp active?' })
  is_active: boolean;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: 'Bootcamp Created Date',
  })
  created_at?: Date;

  @ApiProperty({
    example: '2023-01-02T14:30:00Z',
    description: 'Bootcamp Updated Date',
  })
  updated_at?: Date;
}
