import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ReportedCompanyIndexServiceDto {
  @IsOptional()
  @Transform(({ value }) => {
    return Number.isNaN(Number(value)) ? 0 : Math.abs(Number(value));
  })
  from?: number;
}
