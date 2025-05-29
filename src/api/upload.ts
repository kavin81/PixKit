import { FastifyInstance } from "fastify";
import { uploadSchema } from "../core/zodSchema";
import { s3Upload } from "../infra/s3";
import { imageTransformQueue } from "../infra/queue";
import { randomUUID } from "crypto";

export async function uploadRoutes(fastify: FastifyInstance) {
    fastify.post("/upload", async (req, res) => {
        const parsed = uploadSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).send({ error: "Invalid request data" });
        }
        const { fileName, fileType, imageBuffer, transform } = parsed.data;
        const key = `original/${randomUUID()}-${fileName}`;

        await s3Upload(key, imageBuffer, fileType);

        await imageTransformQueue.add("image", {
            key,
            transformations: transform,
        });

        return res.status(201).send({
            key
        });
    });
}