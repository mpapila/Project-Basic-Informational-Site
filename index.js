var http = require('http')
var url = require('url')
var fs = require('fs')


const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
});

http.createServer((req, res) => {
    var q = url.parse(req.url, true)
    var filename = "." + q.pathname;
    if (q.pathname == "/") {
        filename = "./index.html"
    }

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(page404);
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        return res.end()
    })
}).listen(8080, () => {
    console.log('Server running at http://127.0.0.1:8080/')
})
