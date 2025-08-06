import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // 값을 넣지 않더라도 default value로 dto를 형성하게 하기 위함.
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // validator를 기반으로 변형 처리
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
