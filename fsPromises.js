const fsPromises = require("fs").promises
const path = require("path")

const fileOps = async () => {
    try {

        // read the file and extract data
        const data = await fsPromises.readFile(path.join(__dirname,'assets','starter.txt'), 'utf-8')
        console.log(data)

        // write a new file
        await fsPromises.writeFile(path.join(__dirname,'assets','promise.txt'), data)

        // append the text at the end of file
        await fsPromises.appendFile(path.join(__dirname,'assets','promise.txt'), '\n\nAre you able to buy?')

        // Rename the file
        await fsPromises.rename(path.join(__dirname,'assets','promise.txt'), path.join(__dirname,'assets','promiseComplete.txt'))

        // Read the new data at new file
        const newData = await fsPromises.readFile(path.join(__dirname,'assets','promiseComplete.txt'), 'utf-8')
        console.log(newData)

        // delete the file
        await fsPromises.unlink(path.join(__dirname,'assets','promiseComplete.txt'))
    }
    catch (err) {
        console.error(err)
    }
}

fileOps()