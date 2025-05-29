import { config } from './config.ts'
import IORedis from 'ioredis'
import { Client as MinioClient } from 'minio'

export const redis = new IORedis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
})

export const minio = new MinioClient({
    endPoint: config.s3.endpoint,
    accessKey: config.s3.accessKeyId,
    secretKey: config.s3.secretAccessKey,
    useSSL: true,
})
