/**
 * @author panezhang
 * @date 2018/4/18-13:30
 * @file webpack.client.base.config
 */

import webpack from 'webpack';
import merge from 'webpack-merge';

import HtmlPlugin from 'html-webpack-plugin';
import VersionHashPlugin from 'webpack-version-hash-plugin';
import Visualizer from 'webpack-visualizer-plugin';

import {STAT} from '../../constant';
import {resolvePwd} from '../../path';

import {
    HASH,
    SRC_MAP,

    PUBLIC_PATH,
    WEBPACK_CLIENT_ENTRY,
    WEBPACK_PROVIDES,
    WEBPACK_HTML_PLUGIN_CONF,
    WEBPACK_CACHE_GROUPS
} from '../build-conf';

import baseConf from './webpack.base.config';

const clientBaseConf = {
    target: 'web',

    entry: {
        main: WEBPACK_CLIENT_ENTRY,
        polyfill: [
            'es5-shim',
            'es5-shim/es5-sham',
            'json3',
            'babel-polyfill'
        ]
    },

    output: {
        publicPath: PUBLIC_PATH,
        path: resolvePwd('./build/public/'),
        filename: `[name].[${HASH}].js`,
        globalObject: 'this'
    },

    // Choose a developer tool to enhance debugging
    // https://webpack.js.org/configuration/devtool/
    devtool: SRC_MAP ? 'cheap-module-eval-source-map' : false,

    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },

        splitChunks: {
            maxAsyncRequests: 12,
            maxInitialRequests: 12,
            cacheGroups: {
                polyfill: {
                    chunks: 'all',
                    test: 'polyfill',
                    name: 'polyfill',
                    priority: -5
                },

                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },

                ...WEBPACK_CACHE_GROUPS
            }
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            __BROWSER__: true
        }),

        new webpack.ProvidePlugin(WEBPACK_PROVIDES),

        new HtmlPlugin(WEBPACK_HTML_PLUGIN_CONF),
        new VersionHashPlugin(),

        ...(STAT ? [
            new Visualizer({
                filename: './webpack-stat.html'
            })
        ] : [])
    ]
};

export default merge(baseConf, clientBaseConf);
