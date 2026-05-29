const { createReadStream } = require("node:fs");
const { stat } = require("node:fs/promises");
const { createServer } = require("node:http");
const path = require("node:path");

const port = Number.parseInt(process.env.PORT || "8080", 10);
const host = "0.0.0.0";
const root = __dirname;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    "content-type": "text/plain; charset=utf-8",
  });
  response.end(message);
}

function resolveRequestPath(url) {
  const requestUrl = new URL(url, `http://${host}:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== root) {
    return null;
  }

  return filePath;
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("allow", "GET, HEAD");
    sendText(response, 405, "Method Not Allowed");
    return;
  }

  const filePath = resolveRequestPath(request.url || "/");
  if (!filePath) {
    sendText(response, 404, "Not Found");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      sendText(response, 404, "Not Found");
      return;
    }

    response.writeHead(200, {
      "content-length": fileStat.size,
      "content-type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      sendText(response, 404, "Not Found");
      return;
    }

    sendText(response, 500, "Internal Server Error");
  }
});

server.listen(port, host);
