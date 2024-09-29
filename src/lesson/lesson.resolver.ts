import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-input';
import { Lesson } from './lesson.entities';
import { StudentService } from 'src/student/student.service';
import { StudentType } from 'src/student/student.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudents(assignStudentsToLessonInput);
  }

  @ResolveField((returns) => [StudentType])
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
