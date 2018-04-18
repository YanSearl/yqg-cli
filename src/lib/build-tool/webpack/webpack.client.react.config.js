/**
 * @author panezhang
 * @date 21/03/2018-16:20
 * @file webpack.client.react.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';

import {WEBPACK_CLIENT_CONF} from '../build-conf';
import baseConf from './webpack.client.base.config';

const reactConf = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|redux)/,
                    priority: -5
                }
            }
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ]
};

export default merge(baseConf, reactConf, WEBPACK_CLIENT_CONF);
