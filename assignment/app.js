const http = require('http');

const express = require('express');

const app = express();

// ต้องเอา path อื่นที่ไม่ใช่ '/' ไว้อันแรก เพราะว่า middleware จะไม่ทำอันอื่น และ code จะอ่านจากบนไปล่าง ยกเว้นจะมี next(); ไว้ด้านใน

// '/users' เรียกว่า filter และจัดการด้วย middleware อย่าลืมต้องเรียงลำดับให้ถูก
app.use('/users', (req, res, next) => {
  console.log('From Users');
  res.send('<h1>Hello from Users Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('Hello world');
  res.send('<h1>Hello from "INDEX"</h1>');
});

app.listen(3001);
