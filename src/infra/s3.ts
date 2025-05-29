import { minio } from '../core/connections'
import { config } from '../core/config'

export async function s3Upload(key: string, buffer: Buffer, contentType: string) {
    await minio.putObject(config.s3.bucket, key, buffer, buffer.length, {
        'Content-Type': contentType,
    })
}

export { minio }
