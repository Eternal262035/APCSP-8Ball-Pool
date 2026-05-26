// import { createServer, IncomingMessage, ServerResponse } from "http";
// import { readFile } from "fs/promises";
// import path from "path";

const path = require("path");
const http = require("http");
const readFile = require("fs/promises");


// import { fileURLToPath } from "url";

// [NOT SAFE] RETURNS ANY FILE THE CLIENT ASKS FOR; DO NOT USE IN PRODUCTION
// [NOT SAFE] RETURNS ANY FILE THE CLIENT ASKS FOR; DO NOT USE IN PRODUCTION
// [NOT SAFE] RETURNS ANY FILE THE CLIENT ASKS FOR; DO NOT USE IN PRODUCTION
// [NOT SAFE] RETURNS ANY FILE THE CLIENT ASKS FOR; DO NOT USE IN PRODUCTION
// [NOT SAFE] RETURNS ANY FILE THE CLIENT ASKS FOR; DO NOT USE IN PRODUCTION

// const __filename: string = fileURLToPath(import.meta.url);
// const __dirname: string = path.dirname(__filename);

// ROOT/
const rootDir = path.join(__dirname, "..");

// basic mime type map 
const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".wasm": "application/wasm",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".mjs": "text/javascript",
};

const httpServer = http.createServer(
    async (req, res) => {
        try {
            let reqPath = req.url ?? "/";
            console.log(`URL: ${req.url} | PATH: ${reqPath}`);

            // directory → index.html
            if (reqPath === "/" || reqPath.endsWith("/")) {
                reqPath += "web/index.html";
            }

            if (!(reqPath.startsWith("/build") || reqPath.startsWith("/web"))) {
                res.writeHead(403);
                res.end("403 Forbidden Access");
                return;
            }

            const cleanPath = reqPath.replace(/^\//, "");
            const fullPath = path.join(rootDir, cleanPath);

            const ext = path.extname(fullPath);
            const data = await readFile.readFile(fullPath);

            res.writeHead(200, {
                "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
            });
            res.end(data);
        } catch (e) {
            // console.log(e);
            res.writeHead(404);
            res.end("404 Not Found");
        }
    }
);

const PORT = 3002; // six seven

httpServer.listen(PORT, () => {
    console.log(`[HTTP] Now serving requests on ${PORT}`);
});