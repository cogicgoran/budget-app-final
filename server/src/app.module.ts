import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'dist'),
      exclude: ['/api/.*'],
    }),
  ],
})
export class AppModule {}
