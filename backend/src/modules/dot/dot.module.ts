import { Module } from '@nestjs/common';
import { DotService } from './dot.service';
import { DotController } from './dot.controller';

@Module({
  providers: [DotService],
  controllers: [DotController],
  exports: [DotService],
})
export class DotModule {}
