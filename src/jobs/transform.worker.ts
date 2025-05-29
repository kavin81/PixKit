import { Worker } from "bullmq";

import { minio, redis } from "../core/connections"
import { config } from "../core/config";
import { getExt, streamToBuffer } from "../core/utils"

import { imageTransformQueue } from "../infra/queue";
import { Transformation, transformImage } from "../infra/sharp";



interface TransformJobData {
    key: string;
    transformations: Transformation[];
}

const worker = new Worker<TransformJobData>(
    imageTransformQueue.name,
    async (job) => {
        const { key, transformations } = job.data;

        const stream = await minio.getObject(config.s3.bucket, key);
        const buf = await streamToBuffer(stream);

        await Promise.all(
            transformations.map(async (t, idx) => {
                const out = await transformImage(buf, t);
                const ext = t.format ?? getExt(key);
                const newKey = key.replace('original/', `transformed/${idx + 1}-`) + `.${ext}`

                await minio.putObject(
                    config.s3.bucket,
                    newKey,
                    out,
                    out.length,
                    {
                        'Content-Type': `image/${ext}`,
                    },

                );
            })
        )

    },
    { connection: redis, concurrency: 5, autorun: true }
)

worker.on("completed", (job) => {
    console.log(`Job ${job?.id} completed successfully.`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed with error: ${err.message}`);
});
