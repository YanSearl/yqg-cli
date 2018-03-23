/**
 * @author panezhang
 * @date 20/03/2018-14:10
 * @file run
 */

import logger from '../logger';

import bundle from './scripts/bundle';
import clean from './scripts/clean';
import copy from './scripts/copy';
import start from './scripts/start';

const scripts = {
    bundle,
    clean,
    copy,
    start
};

export default async (name, opts) => {
    // TODO find rollup way to do this
    // const script = require(`./scripts/${name}`);
    const script = scripts[name];
    if (!script) {
        logger.error(`script '${name}' not found.`);
        return;
    }

    logger.time(name);
    await (script.default ? script.default(opts) : script(opts));
    logger.timeEnd(name);
};
