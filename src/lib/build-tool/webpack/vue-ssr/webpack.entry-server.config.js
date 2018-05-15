/**
 * @author panezhang
 * @date 2017/11/28-上午11:56
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';

import {resolvePwd} from '../../../path';
import {
    PUBLIC_PATH,
    WEBPACK_SERVER_ENTRY,
    WEBPACK_SERVER_CONF
} from '../../build-conf';

import baseConf from '../webpack.base.config';
import externals from '../node-externals';

const serverConf = {
    target: 'node',

    devtool: '#source-map',

    entry: WEBPACK_SERVER_ENTRY,

    output: {
        path: resolvePwd('./build'),
        publicPath: PUBLIC_PATH,
        filename: 'entry-server.js',
        libraryTarget: 'commonjs2'
    },

    externals,

    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"'
        }),

        new VueSSRServerPlugin()
    ]
};

export default merge(baseConf, serverConf, WEBPACK_SERVER_CONF);
