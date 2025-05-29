import sharp from 'sharp'

export interface Transformation {
    width?: number
    height?: number
    format?: 'jpeg' | 'png' | 'webp' | 'avif'
    quality?: number
}

export async function transformImage(buffer: Buffer, opts: Transformation): Promise<Buffer> {
    let pipeline = sharp(buffer)

    if (opts.width || opts.height) {
        pipeline = pipeline.resize(opts.width, opts.height, { fit: 'inside' })
    }

    if (opts.format) {
        switch (opts.format) {
            case 'jpeg':
                pipeline = pipeline.jpeg({ quality: opts.quality ?? 80 })
                break
            case 'png':
                pipeline = pipeline.png({ quality: opts.quality ?? 80 })
                break
            case 'webp':
                pipeline = pipeline.webp({ quality: opts.quality ?? 80 })
                break
            case 'avif':
                pipeline = pipeline.avif({ quality: opts.quality ?? 50 })
                break
        }
    }

    return pipeline.toBuffer()
}
