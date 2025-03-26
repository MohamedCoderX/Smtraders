const app = require('./app');
const connectDatabase = require('./config/database');




connectDatabase();

const server = app.listen(process.env.PORT,(res)=>
{
    console.log(`My started ${process.env.PORT} in ${process.env.NODE_ENV}`)
})
app.get("/", (req, res) => {
    res.json({ message: "API is running successfully!" });
  });

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})

