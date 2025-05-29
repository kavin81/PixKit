import { z } from "zod";

export const uploadSchema = z.object({
    fileName: z.string().min(1),
    fileType: z.string().min(1),
    imageBuffer: z.instanceof(Buffer).refine((buffer) => buffer.length > 0),
    transform: z.array(
        z.object({
            width: z.number().int().positive().optional(),
            height: z.number().int().positive().optional(),
            format: z.enum(["jpeg", "png", "webp", "avif"]).optional(),
            quality: z.number().int().min(1).max(100).optional(),
        })
    )
})
