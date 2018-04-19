/**
 * @author panezhang
 * @date 2018/4/18-13:30
 * @file webpack.client.base.config
 * Ref:
 *  - https://github.com/hubcarl/easywebpack/issues/18
 *  - https://github.com/webpack-contrib/mini-css-extract-plugin
 * extract-text-webpack-plugin 不再支持 Webpack 4.3.0，所以改为使用推荐的 mini-css-extract-plugin
 */

import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import VersionHashPlugin from 'webpack-version-hash-plugin';
import Visualizer from 'webpack-visualizer-plugin';

import {STAT} from '../../constant';
import {resolvePwd} from '../../path';

import {
    DEBUG,
    MODE,
    HASH,
    CSS_HASH,
    SRC_MAP,

    WEBPACK_CLIENT_ENTRY,
    WEBPACK_ALIAS,
    WEBPACK_GLOBALS,
    WEBPACK_PROVIDES,
    WEBPACK_HTML_PLUGIN_CONF,
    WEBPACK_CACHE_GROUPS
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

    // Choose a developer tool to enhance debugging
    // https://webpack.js.org/configuration/devtool/
    devtool: SRC_MAP ? 'cheap-module-eval-source-map' : false,
    cache: DEBUG,

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
                            'resolve-url-loader',
                            'sass-loader?sourceMap'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            {loader: 'less-loader', options: {javascriptEnabled: true}}
                        ]
                    }]
                : [
                    {
                        test: /\.css$/,
                        loader: [
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.scss$/,
                        loader: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'resolve-url-loader',
                            'sass-loader?sourceMap'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {loader: 'less-loader', options: {javascriptEnabled: true}}
                        ]
                    }
                ])
        ]
    },

    resolve: {
        alias: WEBPACK_ALIAS
    },

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
            ...globals,
            ...WEBPACK_GLOBALS,
            __BROWSER__: true
        }),

        new webpack.ProvidePlugin(WEBPACK_PROVIDES),

        new HtmlPlugin(WEBPACK_HTML_PLUGIN_CONF),
        new VersionHashPlugin(),

        ...(!DEBUG ? [
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new MiniCssExtractPlugin({filename: `[name].[${CSS_HASH}].css`})
        ] : []),
        ...(STAT ? [
            new Visualizer({
                filename: './webpack-stat.html'
            })
        ] : [])
    ]
};
