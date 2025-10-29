import { Module } from '@nestjs/common';
import { ServerConfigService } from './server-config.service';

@Module({
  providers: [ServerConfigService]
})
export class SharedModule {}
