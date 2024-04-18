import { PrismaClient } from '@prisma/client';
import { getRandomDateWithinTenDays, readCsv } from './utils';
import { join } from 'path';

const prisma = new PrismaClient();

type CoachCSV = {
  email: string;
  phoneNumber: string;
};

type StudentCSV = {
  email: string;
  phoneNumber: string;
};

async function main() {
  try {
    console.log('🚀 Mock seed running');
    const coachPath = join(__dirname, 'data/Coach.csv');
    const studentPath = join(__dirname, 'data/Student.csv');

    const coachData = await readCsv<CoachCSV>(coachPath, [
      'email',
      'phoneNumber',
    ]);
    const studentData = await readCsv<StudentCSV>(studentPath, [
      'email',
      'phoneNumber',
    ]);
    await prisma.$transaction([
      ...coachData.map((el) => {
        return prisma.coach.create({
          data: {
            email: el.email,
            phoneNumber: el.phoneNumber,
          },
        });
      }),
    ]);

    await prisma.$transaction([
      ...studentData.map((el) => {
        return prisma.student.create({
          data: {
            email: el.email,
            phoneNumber: el.phoneNumber,
          },
        });
      }),
    ]);

    const coaches = await prisma.coach.findMany({});
    const students = await prisma.student.findMany({});

    for (const coach of coaches) {
      return prisma.slot.create({
        data: {
          coachId: coach.id,
          startTime: getRandomDateWithinTenDays(),
        },
      });
    }

    for (let i = 0; i < students.length; i++) {
      return prisma.call.create({
        data: {
          coachId: coaches[i].id,
          studentId: students[i].id,
          startTime: getRandomDateWithinTenDays(),
        },
      });
    }

    console.log(`✅ Mock data added`);
  } catch (err) {
    console.log(`❌ Mock Seed Failed`);
    throw err;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
