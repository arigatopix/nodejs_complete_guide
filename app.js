const http = require('http');
const express = require('express');

const app = express();

// express docs
// app.use(path, callback) เพิ่ม path เข้าไป เป็น relative path
app.use('/add-product',(req, res, next) => {
  console.log('In another middleware');
  // ไม่ต้องส่ง content-type เอง express ช่วยทำให้ clean code มากขึ้น
  res.send('<h1>The "Add Product" Page</h1>')
});

app.use('/',(req, res, next) => {
  console.log('In another middleware');
  // ไม่ต้องส่ง content-type เอง express ช่วยทำให้ clean code มากขึ้น
  res.send('<h1>Hello from Express.js</h1>')
});

// * listen server ใช้ได้เพราะ express serve function ให้
app.listen(3000);