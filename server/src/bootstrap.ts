import Fastify from 'fastify';
import cors from '@fastify/cors';
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

  fastify.post('/pools', async (request, replay) => {
    const { title } = request.body;
    return { title };
  });

  fastify.listen({ port: 3333, host: '0.0.0.0' }, () => {
    console.log('Server is running!');
  });
}

bootstrap();
