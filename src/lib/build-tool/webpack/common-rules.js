/**
 * @author panezhang
 * @date 21/03/2018-16:03
 * @file common-rules
 */

export default [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
    {
        test: /\.(txt|md)$/,
        loader: 'raw-loader'
    },
    {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
            limit: 10000
        }
    },
    {
        test: /\.(tpl|eot|ttf|wav|mp3)$/,
        loader: 'file-loader'
    }
];
