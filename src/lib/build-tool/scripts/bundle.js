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
import clientConfig from '../webpack/webpack.client.config';
import serverConfig from '../webpack/webpack.server.config';

export default () => new Promise((resolve, reject) => {
    webpack([clientConfig, serverConfig]).run((err, stats) => {
        if (err) {
            return reject(err);
        }

        console.log(stats.toString(statsConf));
        return resolve(stats);
    });
});
