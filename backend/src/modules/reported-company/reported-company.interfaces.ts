import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ReportedCompanyIndexServiceDto {
  @IsOptional()
  @Transform(({ value }) =>
    !Number.isNaN(Number(value)) ? Math.abs(value) : 0,
  )
  from?: number;
}
