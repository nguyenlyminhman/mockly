import { Module } from '@nestjs/common';
import { MegaboomController } from './megaboom.controller';
import { MegaboomService } from './megaboom.service';

@Module({
  controllers: [MegaboomController],
  providers: [MegaboomService]
})
export class MegaboomModule {}
