/**
 * @author panezhang
 * @date 15/03/2018-18:44
 * @file start
 */

// system modules
import fs from 'fs';
import path from 'path';

// node modules
import express from 'express';
import historyApiFallback from 'connect-history-api-fallback';
import proxy from 'http-proxy-middleware';
import opn from 'opn';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// our modules
import logger from '../../logger';
import {FRAMEWORK_TYPE} from '../../constant';
import runServer from '../runServer';
import {FRAMEWORK, PROXY_URL_LIST, PORT} from '../build-conf';
import stats from '../webpack/stats';
import clientConfig from '../webpack/webpack.client.config';
import spaServerConfig from '../webpack/webpack.server.config';
import vueSsrServerConfig from '../webpack/vue-ssr/webpack.server.config';

const serverConfig = FRAMEWORK === FRAMEWORK_TYPE.VUE_SSR ? vueSsrServerConfig : spaServerConfig;

const DEV_PORT = PORT + 1;

const PROXY_LIST = Array.from(new Set([
    '/api',
    '/admin',
    '/api-web',
    '/chidori',
    ...PROXY_URL_LIST
]));

const isApiUrl = url => PROXY_LIST.some(prefix => url.startsWith(prefix));

const createCompilationPromise = (name, compiler) => new Promise((resolve, reject) => {
    const TAG = `Compiling '${name}'`;
    compiler.plugin('compile', () => logger.time(TAG));
    compiler.plugin('done', (result) => {
        console.info(result.toString(stats));
        if (result.hasErrors()) {
            logger.timeEnd(TAG, 'Failed!');
            reject(new Error('Compilation failed!'));
        } else {
            logger.timeEnd(TAG, 'Succeed!');
            resolve(result);
        }
    });
});

async function launchServer(server) {
    const TAG = 'launch server';
    logger.time(TAG);
    await new Promise(resolve => server.listen(DEV_PORT, resolve));
    logger.info(`The dev server is running at http://local.yangqianguan.com:${DEV_PORT}/`);
    opn(`http://local.yangqianguan.com:${DEV_PORT}/`);
    logger.timeEnd(TAG);
}

function setupClientBundle(devServer) {
    if (!clientConfig) return Promise.resolve();

    // Patch the client-side bundle configurations to enable Hot Module Replacement (HMR)
    const clientWebpackHMREntry = 'webpack-hot-middleware/client?reload=true';
    clientConfig.entry = {
        ...clientConfig.entry,
        main: [
            clientWebpackHMREntry,
            clientConfig.entry.main
        ]
    };

    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    );

    const clientCompiler = webpack(clientConfig);
    const clientPromise = createCompilationPromise('client', clientCompiler);

    // setup middleware
    const fallbackMiddleware = historyApiFallback({verbose: true});
    const hotMiddleware = webpackHotMiddleware(clientCompiler);
    const devMiddleware = webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats
    });

    devServer.use(fallbackMiddleware);
    devServer.use(devMiddleware);
    devServer.use(hotMiddleware);

    return clientPromise;
}

async function start() {
    const devServer = express();
    const proxyMiddleware = proxy({target: `http://localhost:${PORT}`, ws: true});

    let runServerPromise;
    let runServerPromiseResolve;
    let runServerPromiseIsResolved = true;

    devServer.use((req, res, next) => {
        if (!clientConfig) {
            runServerPromise.then(() => proxyMiddleware(req, res, next)).catch(logger.error);
            return;
        }

        const publicPath = clientConfig.output.path;
        if (req.url && req.url.length > 1 && (isApiUrl(req.url) || fs.existsSync(publicPath + req.url))) {
            logger.info('fallback', req.method, req.originalUrl);
            runServerPromise.then(() => proxyMiddleware(req, res, next)).catch(logger.error);
            return;
        }

        next();
    });

    devServer.on('upgrade', proxyMiddleware.upgrade);

    // watch for server update
    const serverCompiler = webpack(serverConfig);
    const serverPromise = createCompilationPromise('server', serverCompiler);
    serverCompiler.plugin('compile', () => {
        if (!runServerPromiseIsResolved) return;
        runServerPromiseIsResolved = false;
        runServerPromise = new Promise(resolve => (runServerPromiseResolve = resolve));
    });

    async function run() {
        const {output: {path: filePath, filename}} = serverConfig;
        const serverPath = path.join(filePath, filename);
        await runServer(serverPath);
        runServerPromiseIsResolved = true;
        runServerPromiseResolve();
    }

    serverCompiler.watch({}, (error, result) => {
        if (!error && !result.hasErrors()) {
            run().catch(logger.error);
        }
    });

    await setupClientBundle(devServer);
    await serverPromise;
    await launchServer(devServer);
}

export default start;
