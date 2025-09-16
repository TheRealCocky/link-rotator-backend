import {
  IsString,
  IsArray,
  IsOptional,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLinkDTO {
  @IsString()
  originalUrl: string;

  @IsArray()
  @IsString({ each: true })
  alternativeUrls: string[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  weights?: number[];
}

export class RotateLinkDTO {
  @IsString()
  redirectUrl: string;
}

export class LinkDTO {
  @IsString()
  id: string;

  @IsString()
  originalUrl: string;

  @IsArray()
  @IsString({ each: true })
  alternativeUrls: string[];

  @IsArray()
  @IsInt({ each: true })
  weights: number[];

  @IsInt()
  accessCount: number;

  @IsArray()
  @IsInt({ each: true })
  clicksPerUrl: number[];
}

export class GetAllLinksDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDTO)
  links: LinkDTO[];
}
