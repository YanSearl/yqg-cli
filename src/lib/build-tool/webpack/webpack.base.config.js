/**
 * @author panezhang
 * @date 2018/5/3-21:27
 * @file webpack.base.config
 * setup common rules, config, and plugins
 *  * Ref:
 *  - https://github.com/hubcarl/easywebpack/issues/18
 *  - https://github.com/webpack-contrib/mini-css-extract-plugin
 * extract-text-webpack-plugin 不再支持 Webpack 4.3.0，所以改为使用推荐的 mini-css-extract-plugin
 */

import webpack from 'webpack';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {
    DEBUG,
    MODE,
    CSS_HASH,

    WEBPACK_ALIAS,
    WEBPACK_GLOBALS
} from '../build-conf';

import globals from './globals';
import rules from './common-rules';

export default {
    mode: MODE,
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
        alias: WEBPACK_ALIAS,
        extensions: ['.js', '.vue', '.json']
    },

    plugins: [
        new webpack.DefinePlugin({
            ...globals,
            ...WEBPACK_GLOBALS
        }),

        ...(DEBUG ? [
            new FriendlyErrorsPlugin()
        ] : [
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new MiniCssExtractPlugin({filename: `[name].[${CSS_HASH}].css`})
        ])
    ]
};
