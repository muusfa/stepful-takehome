import { Injectable } from '@nestjs/common';
import {
  Call,
  Coach,
  Feedback,
  PrismaClient,
  Slot,
  Student,
} from '@prisma/client';
import {
  AddFeedbackDto,
  BookCallDto,
  CreateSlotDto,
  CreateUserDto,
  Role,
} from './app.model';

const prisma = new PrismaClient();
@Injectable()
export class AppRepository {
  async getAvailableSlots(coachId: number): Promise<Slot[]> {
    return await prisma.slot.findMany({
      where: {
        coachId: coachId,
        available: true,
      },
    });
  }

  async getAllCoaches(): Promise<Coach[]> {
    return await prisma.coach.findMany({});
  }

  async getAllStudents(): Promise<Student[]> {
    return await prisma.student.findMany({});
  }

  async getPastCalls(coachId: number): Promise<Call[]> {
    return await prisma.call.findMany({
      where: {
        coachId: coachId,
        startTime: {
          lte: new Date(),
        },
      },
      include: {
        feedback: true,
        student: true,
      },
    });
  }

  async getUpcomingCalls(coachId: number): Promise<Call[]> {
    return await prisma.call.findMany({
      where: {
        coachId: coachId,
        startTime: {
          gte: new Date(),
        },
      },
      include: {
        student: true,
      },
    });
  }

  async getUpcomingCallsStudent(studentId: number): Promise<Call[]> {
    return await prisma.call.findMany({
      where: {
        studentId: studentId,
        startTime: {
          gte: new Date(),
        },
      },
      include: {
        coach: true,
      },
    });
  }

  async createUser(body: CreateUserDto): Promise<Coach | Student> {
    let result;
    if (body.role === Role.COACH) {
      result = await prisma.coach.create({
        data: {
          name: body.name,
          email: body.email,
          phoneNumber: body.phoneNumber,
        },
      });
    } else if (body.role === Role.STUDENT) {
      result = await prisma.coach.create({
        data: {
          name: body.name,
          email: body.email,
          phoneNumber: body.phoneNumber,
        },
      });
    }
    return result;
  }

  async bookCall(body: BookCallDto): Promise<Call> {
    await prisma.slot.update({
      where: {
        id: body.slotId,
      },
      data: {
        available: false,
      },
    });
    return await prisma.call.create({
      data: {
        coachId: body.coachId,
        studentId: body.studentId,
        startTime: body.startTime,
      },
    });
  }

  async addFeedback(body: AddFeedbackDto): Promise<Feedback> {
    return await prisma.feedback.create({
      data: {
        callId: body.callId,
        rating: body.rating,
        notes: body.notes,
      },
    });
  }

  async createSlot(body: CreateSlotDto): Promise<Slot> {
    return await prisma.slot.create({
      data: {
        duration: 2,
        coachId: body.coachId,
        startTime: body.startTime,
      },
    });
  }
}
