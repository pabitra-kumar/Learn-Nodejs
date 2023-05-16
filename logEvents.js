const { format } = require("date-fns")
const {v4: uuid} = require("uuid")

console.log(format(new Date(),"dd/mm/yyyy\tHH:MM:SS\t"))
console.log(uuid)

const fsPromises = require("fs").promises
const fs = require("fs")
const path = require("path")

const logEvents = async (message) => {
    if(!fs.existsSync(path.join(__dirname, "assets")))
    {
        fsPromises.mkdir(path.join(__dirname, "assets" , "write.txt"))
    }
    const dateTime = format(new Date(),"dd/mm/yyyy\tHH:MM:SS\t")
    const id = uuid()
    try {
        fsPromises.appendFile(path.join(__dirname, "assets" , "Eventlog.txt"), `${message}\t${dateTime}\t${id}\n`)
    } catch (err) {
        console.error(err)
    }
}

module.exports = logEvents
