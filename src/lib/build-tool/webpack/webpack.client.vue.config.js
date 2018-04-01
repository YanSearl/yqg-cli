/**
 * @author KylesLight
 * @date 2/16/17-1:51 PM
 * @file webpack.client.config
 */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import VersionHashPlugin from 'webpack-version-hash-plugin';

import {resolvePwd} from '../../path';

import {
    DEBUG,
    MODE,
    HASH,
    CSS_HASH,

    WEBPACK_CLIENT_ENTRY,
    WEBPACK_GLOBALS,
    WEBPACK_PROVIDES,
    WEBPACK_HTML_PLUGIN_CONF,
    WEBPACK_CLIENT_CONF
} from '../build-conf';
import globals from './globals';
import rules from './common-rules';

export default {
    target: 'web',
    mode: MODE,

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
        publicPath: '/',
        path: resolvePwd('./build/public/'),
        filename: `[name].[${HASH}].js`,
        globalObject: 'this'
    },

    module: {
        rules: [
            ...rules,

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },

            ...(DEBUG
                ? [
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'resolve-url-loader',
                            'sass-loader?sourceMap'
                        ]
                    }]
                : [
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract('css-loader')
                    },
                    {
                        test: /\.scss$/,
                        loader: ExtractTextPlugin.extract([
                            'css-loader',
                            'resolve-url-loader',
                            'sass-loader?sourceMap'
                        ])
                    }
                ])
        ]
    },

    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js'
        },

        extensions: ['.js', '.vue', '.json']
    },

    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },

        splitChunks: {
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
            cacheGroups: {
                polyfill: {
                    chunks: 'all',
                    test: 'polyfill',
                    name: 'polyfill',
                    priority: -5
                },

                vue: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](vue)/,
                    priority: -5
                },

                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            ...globals,
            ...WEBPACK_GLOBALS,
            __BROWSER__: true
        }),

        new webpack.ProvidePlugin({...WEBPACK_PROVIDES}),

        new HtmlPlugin(WEBPACK_HTML_PLUGIN_CONF),
        new VersionHashPlugin(),

        ...(!DEBUG ? [
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ExtractTextPlugin({filename: `[name].[${CSS_HASH}].css`, disable: false, allChunks: true})
        ] : [])
    ],

    ...WEBPACK_CLIENT_CONF
};
