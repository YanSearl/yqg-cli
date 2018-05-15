/**
 * @author panezhang
 * @date 21/03/2018-16:04
 * @file webpack.server.config
 */

import webpack from 'webpack';

import {resolvePwd} from '../../path';

import {
    DEBUG,
    MODE,
    SRC_MAP,

    PUBLIC_PATH,
    WEBPACK_GLOBALS,
    WEBPACK_SERVER_ENTRY,
    WEBPACK_SERVER_CONF
} from '../build-conf';

import globals from './globals';
import rules from './common-rules';
import externals from './node-externals';

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
        publicPath: PUBLIC_PATH,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    devtool: SRC_MAP ? 'source-map' : false,
    cache: DEBUG,

    module: {rules},
    externals,

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
