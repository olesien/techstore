var https = require("https");
var fs = require("fs");

const next = require("next");
const port = 443;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

var options = {
    key: fs.readFileSync("Private.key"),
    cert: fs.readFileSync("certificate.crt"),
    ca: [fs.readFileSync("Cloudflare_CA.crt")],
};

app.prepare().then(() => {
    https
        .createServer(options, (req, res) => {
            handle(req, res);
        })
        .listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port}`);
        });
});
