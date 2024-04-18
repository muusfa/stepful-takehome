import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Call, Coach, Feedback, Slot, Student } from '@prisma/client';
import {
  AddFeedbackDto,
  BookCallDto,
  CreateSlotDto,
  CreateUserDto,
} from './app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('available-slots/:coachId')
  async getAvailableSlots(@Param('coachId') coachId: string): Promise<Slot[]> {
    return await this.appService.getAvailableSlots(parseInt(coachId));
  }

  @Get('all-coaches')
  async getAllCoaches(): Promise<Coach[]> {
    return await this.appService.getAllCoaches();
  }

  @Get('all-students')
  async getAllStudents(): Promise<Student[]> {
    return await this.appService.getAllStudents();
  }

  @Get('past-calls/:coachId')
  async getPastCalls(@Param('coachId') coachId: string): Promise<Call[]> {
    return await this.appService.getPastCalls(parseInt(coachId));
  }

  @Get('upcoming-calls/:coachId')
  async getUpcomingCalls(@Param('coachId') coachId: string): Promise<Call[]> {
    return await this.appService.getUpcomingCalls(parseInt(coachId));
  }

  @Get('upcoming-calls-student/:studentId')
  async getUpcomingCallsStudent(
    @Param('studentId') studentId: string,
  ): Promise<Call[]> {
    return await this.appService.getUpcomingCallsStudent(parseInt(studentId));
  }

  @Post('create-user')
  @HttpCode(204)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Coach | Student> {
    return await this.appService.createUser(createUserDto);
  }

  @Post('book')
  async bookCall(@Body() bookCallDto: BookCallDto): Promise<Call> {
    return await this.appService.bookCall(bookCallDto);
  }

  @Post('feedback')
  async addFeedback(@Body() addFeedbackDto: AddFeedbackDto): Promise<Feedback> {
    return await this.appService.addFeedback(addFeedbackDto);
  }

  @Put('create-slot')
  async createSlot(@Body() createSlotDto: CreateSlotDto): Promise<Slot> {
    return await this.appService.createSlot(createSlotDto);
  }
}
