const http = require('http');
const users = [];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>')
        res.write('<h1>Welcome to my page!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>')
        res.write('</html>');
        return res.end();
    } else if (url === '/users') {
        res.write('<html><ul>')
        users.forEach(user => res.write(`<li>${user}</li>`));
        res.write('</ul></html>');
        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunck) => {
            body.push(chunck);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            users.push(username);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);