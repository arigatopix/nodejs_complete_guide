const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// body parser อ่านค่า body ที่มากับ request POST
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  // ไม่ต้องส่ง content-type เอง express ช่วยทำให้ clean code มากขึ้น
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use('/product', (req, res, next) => {
  // ดู body ที่ส่งมาจาก post ใช้ express จะ undefined ต้อง install body-parser
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  // ไม่ต้องส่ง content-type เอง express ช่วยทำให้ clean code มากขึ้น
  res.send('<h1>Hello from Express.js</h1>');
});

// * listen server ใช้ได้เพราะ express serve function ให้
app.listen(3000);
