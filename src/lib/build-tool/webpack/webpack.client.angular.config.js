/**
 * @author zhangpeng
 * @date 17/2/16-下午3:41
 * @file webpack.client.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';

import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import {DEBUG, SRC_MAP, WEBPACK_CLIENT_CONF} from '../build-conf';
import baseConf from './webpack.client.base.config';

// add ng-annotate-loader
const rules = baseConf.module.rules.filter(rule => rule.loader !== 'babel-loader');
rules.unshift({
    test: /\.jsx?$/,
    use: [
        {
            loader: 'ng-annotate-loader',
            options: {
                add: true,
                map: false
            }
        },
        {
            loader: 'babel-loader'
        }
    ],
    exclude: /node_modules/
});

const angularBaseConf = {
    ...baseConf,
    module: {
        ...baseConf.module,
        rules
    }
};

const angularConf = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                angular: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](angular)/,
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
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};

export default merge(angularBaseConf, angularConf, WEBPACK_CLIENT_CONF);
