import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { process } from '@types/node';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: {
      email: 'me@me.me',
    },
    update: {},
    create: {
      email: 'me@me.me',
      username: 'me',
      passwordHash: await bcrypt.hash('123456789', 10)
    }
  });

  const user2 = await prisma.user.upsert({
    where: {
      email: 'you@you.you',
    },
    update: {},
    create: {
      email: 'you@you.you',
      username: 'you',
      passwordHash: await bcrypt.hash('123456789', 10)
    }
  });

  console.log({ user1 });
  console.log({ user2 });

  // const character1 = await prisma.character.upsert({
  //   where: {
  //     name: 'Elix'
  //   },
  //   update: {},
  //   create: {
  //     name: 'Some Person',
  //     description: 'Just some person.',
  //     user: 
  //   }
  // })
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit();
  });