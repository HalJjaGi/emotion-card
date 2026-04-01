import { Controller, Post, Body } from '@nestjs/common';
import { DotService } from './dot.service';
import { IsArray, IsNumber, IsOptional, Min, Max } from 'class-validator';

class GenerateDotDto {
  @IsArray()
  @IsNumber({}, { each: true })
  pattern: number[][];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  variationAmount?: number;
}

@Controller('dot')
export class DotController {
  constructor(private readonly dotService: DotService) {}

  @Post('generate')
  async generate(@Body() generateDotDto: GenerateDotDto) {
    const { pattern, variationAmount = 0.3 } = generateDotDto;
    const dotArt = this.dotService.generateDot(pattern, variationAmount);
    return { dotArt };
  }
}
