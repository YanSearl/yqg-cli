/**
 * @author panezhang
 * @date 15/03/2018-18:44
 * @file bundle
 *
 * build-conf -> config
 * global -> config
 *
 * chunks
 * plugins
 */

import webpack from 'webpack';

import statsConf from '../webpack/stats';
import webpackConfig from '../webpack/webpack.config';

export default () => new Promise((resolve, reject) => {
    if (!webpackConfig) {
        reject(new Error('No config found.'));
        return;
    }

    webpack(webpackConfig).run((err, stats) => {
        if (err) {
            return reject(err);
        }

        console.log(stats.toString(statsConf));
        return resolve(stats);
    });
});
