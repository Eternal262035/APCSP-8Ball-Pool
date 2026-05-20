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

// Basic MIME map
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
                reqPath += "index.html";
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
            console.log(e);
            res.writeHead(404);
            res.end("Not found");
        }
    }
);

const PORT = 3067;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});