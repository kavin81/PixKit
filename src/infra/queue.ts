import { Queue } from 'bullmq'
import { redis } from '../core/connections.js'

export const imageTransformQueue = new Queue('image-transform', {
    connection: redis,
})
