const http = require("http")
const fs = require("fs")
const path = require("path")
const fsPromises = require("fs").promises


const logEvents = require("./logEventsServer")
const EventEmmiter = require("events")

class MyEmitter extends EventEmmiter { }

// Initialize object
const myEmitter = new MyEmitter();
// Add listener to Event
myEmitter.on('log', (msg , fileName) => {
    logEvents(msg , fileName)
})

const PORT = process.env.PORT || 3500

const serveFile = async (contentType, filePath, response) => {
    try {
        rawData = await fsPromises.readFile(filePath, 
            contentType.includes("image") ? '' : 'utf8')
        data = contentType === "application/json" ? JSON.parse(rawData) : rawData
        response.writeHead(
            filePath.includes("404.html") ? 404 : 200, 
            { 'Content-Type': contentType }
            )
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        )
    } catch (err) {
        console.log(err)
        response.statusCode = 500;
        myEmitter.emit('log', `${err.name}: ${err.message}` , 'errLog.txt')
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    myEmitter.emit('log', `${req.url}\t${req.method}` , 'reqLog.txt')
    let extension = path.extname(req.url)

    let contentType;

    switch (extension) {
        case '.css':
            contentType = "text/css"
            break;
        case '.js':
            contentType = "text/javascript"
            break;
        case '.png':
            contentType = "image/png"
            break;
        case '.jpg':
            contentType = "image/jpeg"
            break;
        case '.jpeg':
            contentType = "image/jpeg"
            break;
        case '.json':
            contentType = "application/json"
            break;
        case '.txt':
            contentType = "text/plain"
            break;
        default:
            contentType = "text/html"
    }

    let filePath =
        contentType === "text/html" && req.url === "/"
            ? path.join(__dirname, "views", "index.html")
            : contentType === "data/html" && req.url.slice(-1) === "/"
                ? path.join(__dirname, "views", req.url, "index.html")
                : contentType === "text/html"
                    ? path.join(__dirname, "views", req.url)
                    : path.join(__dirname, req.url)

    // Makes .html extension optional in url
    if (!extension && req.url.slice(-1) != "/") filePath += '.html';

    let fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serveFile(contentType, filePath, res)
    } else {
        switch (path.parse(filePath).base) {
            case "old-page.html":
                res.writeHead(301, { Location: 'new-page.html' })
                res.end()
                break
            case "www-page.html":
                res.writeHead(301, { Location: '/' })
                res.end()
                break
            default:
                serveFile("text/html", path.join(__dirname, "views", "404.html"), res)
        }
    }
})


server.listen(PORT, () => console.log(`server listening at PORT ${PORT}`))