import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { LessonModule } from './lesson/lesson.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entities';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://mongoAdmin:secret@localhost/school?authSource=admin',
      username: "mongoAdmin",
      password: "secret",
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
