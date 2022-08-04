import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// import { process } from '@types/node';

// const PrismaClient = PrismaClientPkg.PrismaClient;

const prisma = new PrismaClient();

async function main() {
	const user1 = await prisma.user.upsert({
		where: { email: 'me@me.me' },
		update: {},
		create: {
			email: 'me@me.me',
			username: 'me',
			passwordHash: await bcrypt.hash('123456789', 10),
			characters: {
				create: [
					{
						name: 'Some person',
						description: 'Just some person'
					}
				]
			}
		}
	});

	const user2 = await prisma.user.upsert({
		where: { email: 'you@you.you' },
		update: {},
		create: {
			email: 'you@you.you',
			username: 'you',
			passwordHash: await bcrypt.hash('123456789', 10),
			characters: {
				create: [
					{
						name: 'A nondescript passerby',
						description: 'You barely notice them.'
					}
				]
			}
		}
	});
	console.log({ user1, user2 });
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
