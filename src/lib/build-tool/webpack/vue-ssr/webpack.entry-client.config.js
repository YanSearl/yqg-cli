/**
 * @author panezhang
 * @date 2017/11/28-上午11:56
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';

import {resolvePwd} from '../../../path';
import {
    HASH,
    PUBLIC_PATH,
    WEBPACK_CLIENT_ENTRY,
    WEBPACK_CLIENT_CONF
} from '../../build-conf';

import baseConf from '../webpack.base.config';

const clientConf = {
    target: 'web',

    entry: {
        app: WEBPACK_CLIENT_ENTRY
    },

    output: {
        path: resolvePwd('./build/public/static'),
        publicPath: PUBLIC_PATH,
        filename: `[name].[${HASH}].js`
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"'
        }),

        new VueSSRClientPlugin()
    ]
};

export default merge(baseConf, clientConf, WEBPACK_CLIENT_CONF);
