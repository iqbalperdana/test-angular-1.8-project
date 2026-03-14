import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ProjectModule } from '../project/project.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.resolve(__dirname, '../../../db/gn_takehome_fs.db'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
    }),
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
