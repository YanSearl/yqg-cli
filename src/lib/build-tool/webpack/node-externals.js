/**
 * @author panezhang
 * @date 2018/5/7-13:16
 * @file node-externals
 */

import nodeExternals from 'webpack-node-externals';

import {WEBPACK_ALIAS} from '../build-conf';

export default nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: [
        /^@yqg\/cli\/dist/,
        /\.css$/,
        ...Object.keys(WEBPACK_ALIAS).map(name => new RegExp(`^${name}`))
    ]
});
