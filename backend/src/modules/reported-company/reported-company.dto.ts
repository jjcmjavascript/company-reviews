import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ReportedCompanyIndexServiceDto {
  @IsOptional()
  @Transform(({ value }) => {
    return Number.isNaN(Number(value)) ? 0 : Math.abs(Number(value));
  })
  from?: number;
}

export class ReportedCompanyCreateDto {
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  name: string;

  @Optional()
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  tax: string;

  @Optional()
  @IsString()
  @MaxLength(250)
  @MinLength(10)
  description: string;

  @Optional()
  @IsString()
  @MaxLength(250)
  @MinLength(6)
  imageUrl: string;
}
