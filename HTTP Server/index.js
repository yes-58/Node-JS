const http=require("http");
const fs=require("fs");
const url=require("url");

//Using http module to create the server and http.createServer() receives request handler callback.
const server=http.createServer((req,res)=>{
    if(req.url === '/favicon.ico'){return res.end()};
    const myUrl=url.parse(req.url,true);
    console.log(myUrl);
    const log=`${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    fs.appendFile('server_log.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                const username=myUrl.query.name;
                res.end(`Hi ${username}`);
                break;
            case "/signup":
                if(req.method==="GET"){
                    res.end("This is a signup form")
                }else if(req.method==="POST"){
                    //DB Query
                    res.end("Inserted Data in Database");
                }
            default:
                res.end("404 not found");
        }

    });
    //console.log("New Request Received");
    //res.end("Hello From Server");
});

server.listen(8000,()=>console.log("Server Started")); //server.listen() binds the server socket to a port and hostname.
//server.listen({ port: 8000, host: '127.0.0.1' }, () => {
//    console.log("Server listening on port 8000 at 127.0.0.1");
//});

