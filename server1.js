const http = require("http")
const fs = require("fs")
const path = require("path")
const fsPromises = require("fs").promises


const logEvents = require("./logEvents")
const EventEmmiter = require("events")

class MyEmitter extends EventEmmiter {}

// Initialize object
const myEmitter = new MyEmitter();

const PORT = process.env.PORT || 3500

const server = http.createServer((req , res) => {
    console.log(req.url , req.method)

    let filePath;

    if(req.url === "/" || req.url === "index.html")
    {
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/html')
        filePath = path.join(__dirname , "views" , "index.html") ;
        fs.readFile(filePath , 'utf8' , (err,data) => {
            res.end(data);
        })
    }

    //   OR

    // switch(req.url) {
    //     case '/':
    //         res.statusCode = 200;
    //     res.setHeader("Content-Type", 'text/html')
    //     filePath = path.join(__dirname , "views" , "index.html") ;
    //     fs.readFile(filePath , 'utf8' , (err,data) => {
    //         res.end(data);
    //     })
    //     break;
    // }
})

server.listen(PORT , ()=> console.log(`server listening at PORT ${PORT}`))