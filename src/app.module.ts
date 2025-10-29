import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MegaboomModule } from './modules/megaboom/megaboom.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),MegaboomModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
