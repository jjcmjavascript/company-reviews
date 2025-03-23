import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ReportedCompanyPaginatedQueryServiceDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  name: string;
}

export class ReportedCompanyListServiceDto {
  @IsOptional()
  @Transform(({ value }) => {
    return Number.isNaN(Number(value)) ? false : Math.abs(Number(value));
  })
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: string;

  @IsOptional()
  @IsString()
  @IsIn(['score', 'name', 'id'])
  orderBy?: string;

  @IsOptional()
  @Transform(({ value }) => {
    return Number.isNaN(Number(value)) ? false : Math.abs(Number(value));
  })
  @IsNumber()
  @IsPositive()
  limit?: number;
}

export class ReportedCompanyCreateDto {
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  tax?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @MinLength(6)
  imageUrl: string;
}

export class ReportedCompanySearchDto {
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  search: string;
}
