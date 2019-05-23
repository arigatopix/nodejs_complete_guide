const http = require('http');
const express = require('express');

const app = express();

// apply middleware
app.use((req, res, next) => {
  console.log('In the middleware');
  // Allow the request to continue the next middleware in line
  next();
});

app.use((req, res, next) => {
  console.log('In another middleware');
  // ไม่ต้องส่ง content-type เอง express ช่วยทำให้ clean code มากขึ้น
  res.send('<h1>Hello from Express.js</h1>')
});

// * listen server ใช้ได้เพราะ express serve function ให้
app.listen(3000);