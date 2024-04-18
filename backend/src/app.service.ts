import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Call, Coach, Feedback, Slot, Student } from '@prisma/client';
import {
  AddFeedbackDto,
  BookCallDto,
  CreateSlotDto,
  CreateUserDto,
} from './app.model';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAvailableSlots(coachId: number): Promise<Slot[]> {
    return await this.appRepository.getAvailableSlots(coachId);
  }

  async getAllCoaches(): Promise<Coach[]> {
    return await this.appRepository.getAllCoaches();
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.appRepository.getAllStudents();
  }

  async getPastCalls(coachId: number): Promise<Call[]> {
    return await this.appRepository.getPastCalls(coachId);
  }

  async getUpcomingCalls(coachId: number): Promise<Call[]> {
    return await this.appRepository.getUpcomingCalls(coachId);
  }

  async getUpcomingCallsStudent(studentId: number): Promise<Call[]> {
    return await this.appRepository.getUpcomingCallsStudent(studentId);
  }

  async createUser(body: CreateUserDto): Promise<Coach | Student> {
    return await this.appRepository.createUser(body);
  }

  async bookCall(body: BookCallDto): Promise<Call> {
    return await this.appRepository.bookCall(body);
  }

  async addFeedback(body: AddFeedbackDto): Promise<Feedback> {
    return await this.appRepository.addFeedback(body);
  }
  async createSlot(body: CreateSlotDto): Promise<Slot> {
    return await this.appRepository.createSlot(body);
  }
}
