/**
 * @author panezhang
 * @date 21/03/2018-18:06
 * @file runServer
 */

// system modules
import cp from 'child_process';

let server;
function killServer() {
    if (server) {
        server.kill('SIGTERM');
    }
}

// Launch or restart the Node.js server
function runServer(serverPath) {
    return new Promise((resolve) => {
        killServer();

        server = cp.fork(serverPath, {
            env: Object.assign({NODE_ENV: 'development'}, process.env),
            silent: false
        });

        server.on('message', (result = {}) => (result.ready && resolve()));
    });
}

process.on('exit', killServer);

export default runServer;
