import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field()
  id: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  students: string[];
}
