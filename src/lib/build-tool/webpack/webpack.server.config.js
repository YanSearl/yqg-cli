/**
 * @author panezhang
 * @date 21/03/2018-16:04
 * @file webpack.server.config
 */

import fs from 'fs';
import webpack from 'webpack';

import {resolvePwd} from '../../path';

import {
    DEBUG,
    MODE,
    SRC_MAP,
    PACKAGE_JSON_PATH,
    WEBPACK_GLOBALS,
    WEBPACK_SERVER_ENTRY,
    WEBPACK_SERVER_CONF
} from '../build-conf';

import globals from './globals';
import rules from './common-rules';

const packageJsonContent = fs.readFileSync(resolvePwd(PACKAGE_JSON_PATH)).toString();
const Package = JSON.parse(packageJsonContent);

export default {
    target: 'node',
    mode: MODE,

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },

    entry: WEBPACK_SERVER_ENTRY,

    output: {
        path: resolvePwd('./build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    devtool: SRC_MAP ? 'source-map' : false,
    cache: DEBUG,

    module: {rules},
    externals: [
        ...Object.keys(Package.dependencies),
        ...Object.keys(Package.devDependencies)
    ],

    plugins: [
        new webpack.DefinePlugin({
            ...globals,
            ...WEBPACK_GLOBALS,
            __BROWSER__: false
        }),

        new webpack.optimize.OccurrenceOrderPlugin()
    ],

    ...WEBPACK_SERVER_CONF
};
