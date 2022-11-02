import Fastify from 'fastify';
import { z as zObject } from 'zod';
import cors from '@fastify/cors';
import ShortUniqueId from 'short-unique-id';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const prisma = new PrismaClient({
    log: ['query'],
  });

  const fastify = Fastify({
    logger: true,
  });

  fastify.register(cors, {
    origin: true,
  });

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();
    return { count };
  });

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();
    return { count };
  });

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();
    return { count };
  });

  fastify.post('/pools', async (request, replay) => {
    const createPoolBody = zObject.object({
      title: zObject.string(),
    });

    const { title } = createPoolBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return replay.status(201).send({ code });
  });

  fastify.listen({ port: 3333, host: '0.0.0.0' }, () => {
    console.log('Server is running!');
  });
}

bootstrap();
