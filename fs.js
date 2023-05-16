const fs = require("fs");
const path = require("path")

fs.readFile(path.join(__dirname,'assets','starter.txt'), 'utf-8' , (err, data) => {
    if(err) throw err;
    console.log(data)
})

fs.writeFile(path.join(__dirname,'assets','reply.txt'), 'bring a apple for me' , (err) => {
    if(err) throw err;
    console.log(" Write Completed")

    fs.appendFile(path.join(__dirname,'assets','reply.txt'), '\n\nAre you able to buy?' , (err) => {
        if(err) throw err;
        console.log(" Append Completed")
    })
    fs.rename(path.join(__dirname,'assets','reply.txt'), path.join(__dirname,'assets','newReply.txt') , (err) => {
        if(err) throw err;
        console.log(" Rename Completed")
    })

})



// for uncaught exception
process.on('uncaughtException' , (err) => {
    console.error(`there is an uncaught exception: ${err}`)
    process.exit(1)
})


