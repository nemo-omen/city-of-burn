import { PrismaClientPkg } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { process } from '@types/node';

const PrismaClient = PrismaClientPkg.PrismaClient;

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'me@me.me',
      username: 'me',
      passwordHash: await bcrypt.hash('123456789', 10)
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'you@you.you',
      username: 'you',
      passwordHash: await bcrypt.hash('123456789', 10)
    }
  });
  console.log({ user1, user2 });


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