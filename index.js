// code away!

const server = require('./server')


const port = 7777
server.listen(port, () => {
    console.log(`\nrunning on http://localhost:${port}\n`);
});