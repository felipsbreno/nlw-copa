import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jonh Doe',
      email: 'jonh.doe@gmail.com',
      avatarUrl: 'https://github.com/diego3g.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Pool jodo do Brasil',
      code: 'BOL123',
      ownerId: user?.id,

      participants: {
        create: {
          userId: user?.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-08T12:00:00.742Z',
      firstTeamCountryCode: 'DE',
      secondyTeamCountryCode: 'BR',
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-10T12:00:00.742Z',
      firstTeamCountryCode: 'BR',
      secondyTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 4,
          secondyTeamPoints: 2,

          partcipant: {
            connect: {
              userId_poolId: {
                userId: user?.id,
                poolId: pool?.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
