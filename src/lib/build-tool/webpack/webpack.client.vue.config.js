/**
 * @author KylesLight
 * @date 2/16/17-1:51 PM
 * @file webpack.client.config
 */

import merge from 'webpack-merge';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import {DEBUG, SRC_MAP, WEBPACK_CLIENT_CONF} from '../build-conf';
import baseConf from './webpack.client.base.config';

const vueConf = {
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js'
        }
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vue: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](vue)/,
                    priority: -5
                }
            }
        },

        ...(DEBUG ? {} : {
            minimizer: [
                new UglifyJsPlugin({
                    cache: DEBUG,
                    parallel: true,
                    sourceMap: SRC_MAP
                }),

                new OptimizeCSSAssetsPlugin({})
            ]
        })
    }
};

export default merge(baseConf, vueConf, WEBPACK_CLIENT_CONF);
