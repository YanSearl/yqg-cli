/**
 * @author panezhang
 * @date 21/03/2018-16:20
 * @file webpack.client.react.config
 */

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import VersionHashPlugin from 'webpack-version-hash-plugin';

import {resolvePwd} from '../../path';
import {DEBUG, MODE, HASH, CSS_HASH} from './build-conf';
import globals from './globals';
import rules from './common-rules';

export default {
    target: 'web',
    mode: MODE,

    entry: {
        main: './common/app/index.js', // TODO config
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
        filename: `[name].[${HASH}].js`
    },

    module: {
        rules: [
            ...rules,
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
                            'sass-loader'
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
                            'sass-loader'
                        ])
                    }
                ])
        ]
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

                react: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|redux)/,
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

    plugins: [ // TODO config
        new webpack.DefinePlugin({
            ...globals,
            __BROWSER__: true
        }),

        new VersionHashPlugin(),

        new webpack.ProvidePlugin({
            React: 'react',
            YqgToast: [resolvePwd('./common/util/yqg-toast'), 'default']
        }),

        new HtmlPlugin({
            template: resolvePwd('./common/app/index.html'),
            favicon: resolvePwd('./common/app/fav.png')
        }),

        ...(!DEBUG ? [
            new ExtractTextPlugin({filename: `[name].[${CSS_HASH}].css`, allChunks: true}),
            new webpack.optimize.AggressiveMergingPlugin()
        ] : [])
    ]
};
