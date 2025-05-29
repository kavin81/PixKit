import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart'
import pino from 'pino'
import { config } from './config.ts';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
})

export function buildFastify() {
    const fastify = Fastify({ logger });
    fastify.register(fastifyMultipart)
}

