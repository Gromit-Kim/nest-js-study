// import http from 'http'; 와 동일하다.
const http = require("http");

// localhost -> 127.0.0.1 -> loop back -> 서버를 실행한 컴퓨터
const host = "localhost";
const port = 3000;

// req -> request -> 요청
// res -> response -> 응답
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("<h1>Hello World</h1>");
});

server.listen(port, host, () => {
  console.log("server running on http://localhost:3000");
});

// node 1_server.js 명령어로 실행할 수 있다.
// chorme에서 http://localhost:3000을 하면 이 서버에 요청을 할 수 있다.
// chorme에서 Hello World가 뜨는 것을 볼 수 있다.
