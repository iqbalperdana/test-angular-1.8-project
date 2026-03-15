import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class ProjectSearchDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Expose({ name: 'per_page' })
  perPage?: number;

  @Type(() => String)
  @IsOptional()
  keyword?: string;

  @Type(() => String)
  @IsOptional()
  area?: string;

  @Type(() => String)
  @IsOptional()
  company?: string;
}
