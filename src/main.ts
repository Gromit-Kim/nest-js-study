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
      whitelist: true, // validator가 validation decorator가 적용되지 않은 모든 프로퍼티를 삭제한다.
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
