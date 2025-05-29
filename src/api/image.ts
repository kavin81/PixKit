import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { minio  } from '../core/connections'

export async function imageRoute(fastify: FastifyInstance) {
    fastify.get('/image/:key', async (req: FastifyRequest<{ Params: { key: string } }>, res: FastifyReply) => {
        const { key } = req.params

        try {
            const stream = await minio.getObject(process.env.S3_BUCKET!, key)
            res
                .header('Content-Type', 'image/*')
                .header('Cache-Control', 'public, max-age=31536000, immutable')
                .send(stream)
        } catch (err) {
            res.code(404).send({ error: 'Image not found' })
        }
    })
}
