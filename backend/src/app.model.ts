import { Call } from '@prisma/client';

export type Slot = {
  id: number;
  duration: number;
  startTime: string;
  available: boolean;
};
export enum Role {
  COACH,
  STUDENT,
}
export type CreateUserDto = {
  email: string;
  phoneNumber: string;
  role: Role;
  name?: string;
  calls?: Call[];
  slots?: Slot[];
};

export type BookCallDto = {
  studentId: number;
  coachId: number;
  slotId: number;
  startTime: Date;
};

export type AddFeedbackDto = {
  callId: number;
  rating: number;
  notes: string;
};

export type CreateSlotDto = {
  coachId: number;
  startTime: Date;
};
