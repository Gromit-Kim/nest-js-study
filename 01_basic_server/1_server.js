// import http from 'http'; 와 동일하다.
const http = require("http");

// localhost -> 127.0.0.1 -> loop back -> 서버를 실행한 컴퓨터
const host = "localhost";
const port = 3000;

// req -> request -> 요청
// res -> response -> 응답
http.createServer((req, res) => {});
