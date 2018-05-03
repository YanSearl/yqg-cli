/**
 * @author panezhang
 * @date 2017/11/28-上午11:56
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import {resolvePwd} from '../../../path';
import {
    WEBPACK_SSR_SERVER_ENTRY,
    WEBPACK_SSR_SERVER_CONF
} from '../../build-conf';

import baseConf from '../webpack.base.config';

const ssrServerConf = {
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    },

    devtool: '#source-map',
    entry: WEBPACK_SSR_SERVER_ENTRY,

    output: {
        path: resolvePwd('./build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    externals: [
        /vue-ssr-server-bundle\.json$/,
        /vue-ssr-client-manifest\.json$/,
        nodeExternals({
            // do not externalize CSS files in case we need to import it from a dep
            whitelist: /(^@yqg\/cli\/dist)|(\.css$)/
        })
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"'
        })
    ]
};

export default merge(baseConf, ssrServerConf, WEBPACK_SSR_SERVER_CONF);
