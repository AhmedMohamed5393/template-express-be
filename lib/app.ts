import Debug from "debug";
import express from "express";
import * as env from "./environment";
import router from "./template/router";
const debug = Debug("template-express:app");
const app = express();
const port = env.PORT || 3000;
const host = env.HOST;
app.use((req, res, next) => {
    req.headers["X-Forwarded-Proto"] = "https";
    res.header("Access-Control-Allow-Origin", env.FRONTEND_HOST);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Language, Accept, Authorization, token, Set-Cookie, Cookie");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT ,PATCH, DELETE, OPTIONS");
    next();
});
app.use("/api/", router);
app.get("/", (req, res) => { res.send("The Template App is up and running!"); });
app.use(notFoundHandler);
app.set("port", port);
app.listen(port , host , (err) => {
    if(err) throw err;
    console.log(`The server is connected to http://${host}:${port}`);
});
module.exports = app;
function notFoundHandler(req, res) {
    debug(req.protocol + "://" + req.get("host") + req.originalUrl);
    return res.status(404).json({ error: "Not Found" });
}
