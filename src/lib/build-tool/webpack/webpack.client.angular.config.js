/**
 * @author zhangpeng
 * @date 17/2/16-下午3:41
 * @file webpack.client.config
 * Ref:
 *  - https://github.com/hubcarl/easywebpack/issues/18
 *  - https://github.com/webpack-contrib/mini-css-extract-plugin
 * extract-text-webpack-plugin 不再支持 Webpack 4.3.0，所以改为使用推荐的 mini-css-extract-plugin
 */

import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import VersionHashPlugin from 'webpack-version-hash-plugin';

import {resolvePwd} from '../../path';

import {
    DEBUG,
    MODE,
    HASH,
    CSS_HASH,
    SRC_MAP,

    WEBPACK_CLIENT_ENTRY,
    WEBPACK_GLOBALS,
    WEBPACK_ALIAS,
    WEBPACK_PROVIDES,
    WEBPACK_HTML_PLUGIN_CONF,
    WEBPACK_CACHE_GROUPS,
    WEBPACK_CLIENT_CONF
} from '../build-conf';

import globals from './globals';
import commonRules from './common-rules';

const rules = commonRules.filter(rule => rule.loader !== 'babel-loader');
rules.push(
    {
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
            }
        ])
);

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
        path: resolvePwd('./build/public'),
        filename: `[name].[${HASH}].js`,
        globalObject: 'this'
    },

    // Choose a developer tool to enhance debugging
    // https://webpack.js.org/configuration/devtool/
    devtool: SRC_MAP ? 'cheap-module-eval-source-map' : false,
    cache: DEBUG,

    module: {rules},
    resolve: {
        alias: {
            ...WEBPACK_ALIAS
        }
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

                angular: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](angular)/,
                    priority: -5
                },

                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },

                ...WEBPACK_CACHE_GROUPS
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
        new webpack.DefinePlugin({
            ...globals,
            ...WEBPACK_GLOBALS,
            __BROWSER__: true
        }),

        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            ...WEBPACK_PROVIDES
        }),

        new HtmlPlugin(WEBPACK_HTML_PLUGIN_CONF),
        new VersionHashPlugin(),

        ...(!DEBUG ? [
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new MiniCssExtractPlugin({filename: `[name].[${CSS_HASH}].css`})
        ] : [])
    ],

    ...WEBPACK_CLIENT_CONF
};
