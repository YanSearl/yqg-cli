/**
 * @author panezhang
 * @date 19/03/2018-18:53
 * @file check-version
 */

import {existsSync, readFileSync, writeFileSync} from 'fs';

import expandTilde from 'expand-tilde';
import getPackageInfo from 'package-json';
import semver from 'semver';

import {name, version} from '../../package.json';
import {VERSION_CHECK_DISABLE, VERSION_CHECK_PERIOD, VERSION_FILE_PATH} from './constant';
import logger from './logger';

const LOG_TAG = 'check-version';

export default () => new Promise((resolve, reject) => {
    if (VERSION_CHECK_DISABLE) { // yqg local install
        resolve();
        return;
    }

    // check timestamp
    let timestamp = 0;
    const filePath = expandTilde(VERSION_FILE_PATH);
    if (existsSync(filePath)) {
        timestamp = +readFileSync(filePath).toString() || 0;
    }

    const now = Date.now();
    if (now - timestamp < VERSION_CHECK_PERIOD) {
        resolve();
        return;
    }

    logger.time(LOG_TAG);
    getPackageInfo(name).then(({version: latestVersion}) => {
        if (semver.gt(latestVersion, version)) { // new version found!
            logger.strong(`Please run 'npm i -g ${name}@${latestVersion}' to update your yqg-cli.`);
        } else if (semver.lt(latestVersion, version)) { // version might have some problems
            logger.error(`npm latest version ${latestVersion} is less than local version ${version}.`);
        } else { // latest yet!
            logger.success('Congratulations! Your yqg-cli is the latest!');
            writeFileSync(filePath, now);
        }

        logger.timeEnd(LOG_TAG);
        resolve();
    }, reject);
});
