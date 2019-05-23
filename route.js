const fs = require('fs'); 

const requestHandler = (req, res) => {
  // request
  const url = req.url;
  const method = req.method;

  if (url === '/'){ 
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    res.write('<h1>Enter Message</h1>')
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
    res.write('</body>');
    res.write('</html>');
  
    // ต้องใส่ return res.end(); เพื่อจบ loop ของ if และไม่ให้ JS ไป run response บรรทัดนอก if
    return res.end();
  }
  
  if (url === '/message' && method === 'POST') {
    // รับ input จาก form (action='POST')
    // รับ data จาก request โดยใช้ stream, buffer 
    // stream คือเส้นทางที่ request เดินทาง buffer คือส่วนต่างๆ ที่ดู request ใน stream
  
    // ปกติ requst จะส่ง body มาหลายๆ ก้อน (chunk) แล้วเอามารวมกันในนี้
    const body = [];
    req.on('data', (chunk) => {
      // จะเห็น buffer เป็นก้อนๆ
      console.log(chunk);
      body.push(chunk);
    });
  
    // เมื่อรับ  request เสร็จแล้ว จบกระบวนการ
    return req.on('end', () => {
      // แปลง body รวมจากก้อนเป็นอันเดียว แล้วแปลงเป็น plain text
      const parseBody = Buffer.concat(body).toString();
  
      // จะเห็น name =value ที่ input เข้ามา
      console.log(parseBody);
  
      // write input to file
      const message = parseBody.split('=')[1];
      fs.writeFileSync('message.txt', message, err => {
        // redirect
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  
  // response
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server</h1></body>');
  res.write('</html>');
  // ส่งจบแล้วต้องใช้ end และไม่สามารถส่ง res อะไรได้อีก
  res.end();
};

// export route.js ไปใช้กับ filre อื่นๆ
// module.exports = requestHandler;

// other exports ต้องเรียกแบบ route.requestHandler , route.someText
// module.exports = {
//   requestHandler,
//   someText : 'Some Text'
// }

// other exports
module.exports.requestHandler = requestHandler;
module.exports.someText = 'Some Text';

// or
// exports.requestHandler = requestHandler;
// exports.someText = 'Some Text';