import express from "express";
import index from "./index";
const router = express.Router();
const config = index.getConfig();
const service = index.createModule();
config.middlewares.forEach((middleware) => router.use(middleware.handler));
config.endpoints.forEach((endpoint) => router[endpoint.verb.toLowerCase()](endpoint.url, endpoint.middlewares, service[endpoint.function].bind(service)));
export default router;
