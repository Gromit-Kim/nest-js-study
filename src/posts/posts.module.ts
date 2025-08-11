import { BadRequestException, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { POST_IMAGE_PATH } from 'src/common/const/path.const';
import { v4 as uuid } from 'uuid';

// TypeOrmModule.forRoot()는 typeORM에 연결 설정을 할 때, appmodule에서 사용하고
// Feature는 모델에 해당되는 레포지토리를 주입할 때 사용한다.
// PostsModel를 넣으면 typeORM이 알아서 model과 관련된 레포지토리를 만들어 준다.
@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel]),
    AuthModule,
    UsersModule,
    CommonModule,
    MulterModule.register({
      limits: {
        // byte 단위로 입력
        fileSize: 10_000_000,
      },
      fileFilter: (req, file, callback) => {
        /**
         * callbakc(에러, boolean)
         *
         * 첫 번째 파라미터에는 에러가 있을 경우 에러 정보를 넣어준다.
         * 두 번째 파라미터에는 파일을 (다운)받을지 말지 boolean을 넣어준다.
         */
        // xxx.jpg -> .jpg
        const extension = extname(file.originalname);
        if (
          extension != '.jpg' &&
          extension !== '.jpeg' &&
          extension !== '.png'
        ) {
          return callback(
            new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다.'),
            false,
          );
        }
        return callback(null, true);
      },
      storage: multer.diskStorage({
        destination: function (req, res, callback) {
          // 파일을 저장할 폴더의 위치
          callback(null, POST_IMAGE_PATH);
        },
        filename: function (req, file, cb) {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
