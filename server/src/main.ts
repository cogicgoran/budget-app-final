import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
const port = process.env.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
bootstrap();
