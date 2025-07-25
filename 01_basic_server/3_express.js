// `npm init -y` 혹은 `yarn init` 명령어로
// package.json을 만든다.

const express = require("express");

const app = express(); // app에 원하는 endpoints를 붙일 수 있다.

// http method에 따라서 함수의 이름만 같고, 함수에 들어가는 값들은 모두 동일하다.
// app.get();
// app.post();
// app.delete();
// app.put();

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/post", (req, res) => {
  res.send("<h1>Post Page</h1>");
});

app.get("/user", (req, res) => {
  res.send("<h1>User Page</h1>");
});

// app.use는 미들웨어에서 사용하는 것
app.use((req, res) => {
  res.status(404).send("<h1>404 Page Not Found!</h1>");
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});

// node 2_server.js로 실행하면
// express를 설치하지 않아서 오류가 날 수 있다.
// yarn add express 혹은 npm install --save express로 설치한다.
// 그러면 node-modules가 생긴다.
