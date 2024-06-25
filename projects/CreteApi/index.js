const http = require('http');
const myServer = (request, response) => {
    //Todo: write the logic to handle the request and send the response
    console.log('Request recieved')
    console.log(request.url)
    // response.end("Hello from Node js....")
    const res = {
        success: true,
        message: "This is my first Api"
    }

    if (request.url === '/login') {

        response.writeHead(200, {
            'Content-Type': 'application/json',
        })
        if (request.method === "GET") {
            response.end(JSON.stringify({
                success: true,
                message: "This is Login api"
            }));
        }


    } else if (request.url === '/user-list') {
        response.end("List page")
    } else if (request.url === '/logout') {
        response.end("Logout page")
    } else {

        response.end(JSON.stringify({
            success: false,
            message: "Page not found"
        }))
    }

};
const server = http.createServer(myServer);

server.listen(8000, () => {
    console.log('server is running at port 3000');
})

