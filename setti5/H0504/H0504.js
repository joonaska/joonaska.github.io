const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

let pyynnot = 0;

const server = http.createServer((req, res) => {
  pyynnot++;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Terve Muailma!\n');
  res.write('Request counter value is ' + pyynnot);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
