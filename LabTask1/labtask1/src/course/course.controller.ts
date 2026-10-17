import { Controller,Delete, Param,Get } from '@nestjs/common';
import { CourseService } from './course.service.js';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get()
  GetAllCourse(){
    return 'all courses';
  }
  @Get(':id')
  getCourseById(@Param('id')id: string){
    return `Course with id ${id} `;
  }
  @Delete (':id')
  deleteCourseById(@Param('id')id: string){
    return `Course with id ${id} deleted`;
  }
}
