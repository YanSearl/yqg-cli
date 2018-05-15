/**
 * @author panezhang
 * @date 2017/11/28-上午11:56
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';

import {resolvePwd} from '../../../path';
import {
    PUBLIC_PATH,
    WEBPACK_SSR_SERVER_ENTRY,
    WEBPACK_SSR_SERVER_CONF
} from '../../build-conf';

import baseConf from '../webpack.base.config';
import externals from '../node-externals';

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
        publicPath: PUBLIC_PATH,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    externals: [
        /vue-ssr-server-bundle\.json$/,
        /vue-ssr-client-manifest\.json$/,
        externals
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"'
        })
    ]
};

export default merge(baseConf, ssrServerConf, WEBPACK_SSR_SERVER_CONF);
