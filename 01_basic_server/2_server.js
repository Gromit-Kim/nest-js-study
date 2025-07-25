const http = require("http");
const url = require("url"); // node js에서 기본으로 제공해주는 패키지

const host = "localhost";
const port = 3000;

// request에는 path 관련 정보가 있다.
// 이를 이용해서 path별로 다른 페이지를 보여줄 수 있다.
const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname; // 요청이 보내진 url을 추출할 수 있다.

  // endpoints가 매우 많을 때 if문으로 분기처리를 할 순 없다!
  // 더 복잡한 기능을 추가할 때 힘들기 때문에
  // nodejs 기반으로 만들어진 express나 nestjs같은 프레임워크를 사용한다.
  if (path === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Home Page!</h1>");
  } else if (path === "/post") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Post Page!</h1>");
  } else if (path === "/user") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>user Page!</h1>");
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(port, host, () => {
  console.log("server running on http://localhost:3000");
});
