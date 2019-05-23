const http = require('http');

const server = http.createServer((req, res) => {
  // check url and method
  const url = req.url;
  const method = req.method;

  // index page
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Asignment Index page</title></head>');
    res.write('<body>');
    res.write('<h1>Input some user</h1>');
    res.write('<form action="/create-user" method="POST"><input type="test" name="user"><button type="submit">Submit</button></form>')
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  // users page
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Users Page</title></head>');
    res.write('<body>');
    res.write('<h1>Users Page</h1>');
    res.write('<ul><li>User 1</li></ul>')
    res.write('</body>');
    res.write('</html>');
    return res.end();
  } 

  // create user
  if (url === '/create-user' && method === 'POST') {
    // รับ data (request) จาก input 
    const body = [];
    // รับมาเป็นก้อน
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // แปลง buffer เป็น string
    req.on('end', () => {
      // แปลง buffer รวม array เป็นก้อน แล้วแปลงเป็น string
      const parseBody = Buffer.concat(body).toString();

      const message = parseBody.split('=')[1];
      console.log(message);

    })
    // redirect
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  
  else {
    res.write('<html>');
    res.write('<head><title>Page not found</title></head>');
    res.write('<body>');
    res.write('<h1>Page not found</h1>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
});

server.listen(3000);