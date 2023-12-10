import { ApiProperty } from "@nestjs/swagger";
import { BootcampResponse } from "./bootcamp.response";

export class ListBootcampsResponse {
    @ApiProperty({ type: [BootcampResponse], description: 'List of Bootcamps' })
    bootcamps: BootcampResponse[];
  }