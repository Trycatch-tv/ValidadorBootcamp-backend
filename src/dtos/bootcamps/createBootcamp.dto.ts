import { ApiProperty } from '@nestjs/swagger';

export class CreateBootcampDto {
  @ApiProperty({
    example: 'free camp code',
    description: 'Bootcamp name',
    required: true,
  })
  name: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'bootcamp description',
  })
  description?: string;

  @ApiProperty({
    example: 'freecodecamp.com',
    description: 'bootcamp webside',
  })
  url?: string;

  @ApiProperty({
    example: 'https://www.facebook.com/freecodecamp',
    description: 'bootcamp facebook page',
  })
  facebook_url?: string;

  @ApiProperty({
    example: 'https://www.instagram.com/freecodecamp',
    description: 'bootcamp instagram page',
  })
  instragram_url?: string;

  @ApiProperty({
    example: true,
    description: 'bootcamp is endorsed',
    default: false,
  })
  is_endorsed: boolean;

  @ApiProperty({
    example: 'ITM',
    description: 'bootcamp endorsed by some organization',
  })
  endorsed_by?: string;

  @ApiProperty({
    example: false,
    description: 'bootcamp is verified',
    default: false,
  })
  is_verified: boolean;

  @ApiProperty({
    example: 'colombia',
    description: 'bootcamp country name',
    required: true,
  })
  country_name: string;

  @ApiProperty({
    example: 'CO',
    description: 'bootcamp country iso',
    required: true,
  })
  country_iso: string;

  @ApiProperty({
    example: 'presencial',
    description: 'bootcamp mode',
    enum: ['virtual', 'presencial', 'hibrido'],
    required: true,
  })
  mode: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Bootcamp email',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '+573023830491',
    description: 'Bootcamp email',
    required: true,
  })
  phone: string;

  @ApiProperty({
    example: '12121212121212',
    description: 'user to lasted update',
    required: true,
  })
  user_id: string;
}
