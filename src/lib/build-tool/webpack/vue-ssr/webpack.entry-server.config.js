/**
 * @author panezhang
 * @date 2017/11/28-上午11:56
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';

import {resolvePwd} from '../../../path';
import {
    WEBPACK_SERVER_ENTRY,
    WEBPACK_SERVER_CONF
} from '../../build-conf';

import baseConf from '../webpack.base.config';

const serverConf = {
    target: 'node',

    devtool: '#source-map',

    entry: WEBPACK_SERVER_ENTRY,

    output: {
        path: resolvePwd('./build'),
        filename: 'entry-server.js',
        libraryTarget: 'commonjs2'
    },

    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/
    }),

    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"server"'
        }),

        new VueSSRServerPlugin()
    ]
};

export default merge(baseConf, serverConf, WEBPACK_SERVER_CONF);
