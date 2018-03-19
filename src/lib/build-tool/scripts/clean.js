/**
 * @author panezhang
 * @date 15/03/2018-18:44
 * @file clean
 */
/* eslint-disable no-unused-expressions, no-restricted-syntax, no-await-in-loop */

import {remove, ensureDir} from 'fs-extra';

const DEFAULT_OPTIONS = {
    remove: 'build', // string or arrays of string, dirs to be removed
    recreate: true, // whether to recreate removed dirs
    ensure: 'build' // extra dir(s) to be ensured
};

export default async (opts) => {
    const {remove: optsRemove, recreate, ensure: optsEnsure} = Object.assign({}, DEFAULT_OPTIONS, opts);
    const removeTargets = typeof optsRemove === 'string' ? [optsRemove] : optsRemove;
    const ensureTargets = recreate ? [...removeTargets] : [];
    if (optsEnsure) {
        typeof optsEnsure === 'string' ? ensureTargets.push(optsEnsure) : ensureTargets.push(...optsEnsure);
    }

    for (const target of removeTargets) {
        await remove(target);
    }

    for (const target of ensureTargets) {
        await ensureDir(target);
    }
};
