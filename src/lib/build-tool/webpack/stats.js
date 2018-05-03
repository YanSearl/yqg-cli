/**
 * @author panezhang
 * @date 21/03/2018-16:02
 * @file stats
 */

import {DEBUG, VERBOSE} from '../build-conf';

export default {
    colors: DEBUG,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
};
