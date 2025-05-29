import Fastify from "fastify";

import { uploadRoutes } from "./api/upload.js";
import { imageRoute } from "./api/image.js";

const app = Fastify({
    logger: true,
});

await uploadRoutes(app);
await imageRoute(app);

app.listen({ port: 3000 }, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on http://localhost:3000`);
});
