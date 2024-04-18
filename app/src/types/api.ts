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

export type Coach = {
  id: number;
  name?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  calls: Call[];
  slots: Slot[];
  phoneNumber: string;
};

export type Slot = {
  id: number;
  duration: number;
  coachId: number;
  coach: Coach;
  startTime: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  id: number;
  name?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  calls: Call[];
  phoneNumber: string;
};

export type Call = {
  id: number;
  rating: number;
  notes?: string;
  coach: Coach;
  coachId: number;
  student: Student;
  studentId: number;
  startTime: string;
  feedback: Feedback;
  createdAt: string;
  updatedAt: string;
};

export type Feedback = {
  id: number;
  rating: number;
  notes?: string;
  call: Call;
  callId: number;
  createdAt: string;
  updatedAt: string;
};
