import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entities';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-input';
import { Student } from '../student/student.entities';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      ...createLessonInput,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudents({
    id,
    students,
  }: AssignStudentsToLessonInput): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });

    lesson.students = [...lesson.students, ...students];

    return this.lessonRepository.save(lesson);
  }
}
