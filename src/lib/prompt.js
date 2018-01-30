/**
 * @author Kyles Light
 * @date 17/11/06-下午5:57
 * @file prompt
 */

import chalk from 'chalk';
import prompt from 'prompt';

import {signature} from './constant';

prompt.message = chalk.yellow(signature);

export default properties => new Promise((resolve, reject) => {
    prompt.start();
    prompt.get({properties}, (err, ret) => (err ? reject(err) : resolve(ret)));
});
