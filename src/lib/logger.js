/**
 * @author panezhang
 * @date 15/03/2018-22:33
 * @file logger
 */

import chalk from 'chalk';
import {signature} from './constant';

const colored = (chalkMethod, ...args) => args.map(obj => (typeof obj === 'string' ? chalkMethod(obj) : obj));

export const timeFormat = time => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
export const timePrefix = (time = new Date()) => chalk.yellow(`[${timeFormat(time)}][${signature}]`);

const timeInfoMap = {};

const logger = {
    info(...args) {
        console.log(timePrefix(), ...args);
    },

    error(...args) {
        console.error(timePrefix(), ...colored(chalk.red, ...args));
    },

    success(...args) {
        console.error(timePrefix(), ...colored(chalk.green, ...args));
    },

    strong(...args) {
        console.error(timePrefix(), ...colored(chalk.bgGreen, ...args));
    },

    time(tag, ...args) {
        if (!tag) throw new Error('Tag can not be empty!');

        timeInfoMap[tag] = {timeStarted: Date.now()};
        logger.info(`Starting '${tag}' ...`, ...args);
    },

    timeEnd(tag, ...args) {
        if (!tag) throw new Error('Tag can not be empty!');

        const timeInfo = timeInfoMap[tag];
        if (!timeInfo) throw new Error(`logger.time(${tag}) has not been invoked yet.`);

        const millis = Date.now() - timeInfo.timeStarted;
        delete timeInfoMap[tag];

        logger.info(`Finished '${tag}' after ${millis} ms`, ...args);
    }
};

export default logger;
