/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg-angular
 */

import {execFileSync} from 'child_process';
import path from 'path';

import '@babel/polyfill';
import chalk from 'chalk';

import {resolveYqgShell} from '../lib/path';
import prompt from '../lib/prompt';

const scripts = [
    {filename: 'git-clean-local-branch.sh', desc: '清理本地的 release 分支'},
    {filename: 'git-clean-remote-branch.sh', desc: '清理远程的 release 分支'}
];

const hintText = scripts
    .map((script, idx) => `${chalk.yellow(idx + 1)}. ${chalk.green(script.filename)} ${script.desc}`)
    .join('\n');

console.log(`请选择要执行的脚本：\n${hintText}\n`);

const properties = {
    no: {
        pattern: /^\d+$/,
        description: '输入一个序号',
        message: '只能输入数字',
        required: true
    }
};

prompt(properties)
    .then((result) => {
        const script = scripts[result.no - 1];
        if (!script) {
            console.error(`序号为 ${result.no} 的脚本不存在！`);
            return;
        }

        execFileSync(resolveYqgShell(script.filename), {stdio: 'inherit'});
    })
    .catch(console.error);
