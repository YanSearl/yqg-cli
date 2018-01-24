/**
 * @author panezhang
 * @date 28/12/2017-19:19
 * @file yqg-angular
 */

import {execFileSync} from 'child_process';
import path from 'path';

import chalk from 'chalk';
import prompt from 'prompt';

const resolveScript = (filename: string) => path.resolve(__dirname, './yqg-shell-lib/', filename);

const scripts = [
    {filename: 'git-clean-local-branch.sh', desc: '清理本地的 release 分支'},
    {filename: 'git-clean-remote-branch.sh', desc: '清理远程的 release 分支'}
];

const hintText = scripts
    .map((script, idx) => `${chalk.yellow(idx + 1)}. ${chalk.green(script.filename)} ${script.desc}`)
    .join('\n');

console.log(`请选择要执行的脚本：\n${hintText}\n`);

const schema = {
    properties: {
        no: {
            pattern: /^\d+$/,
            description: '输入一个序号',
            message: '只能输入数字',
            required: true
        }
    }
};

prompt.start();
prompt.get(schema, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }

    const script = scripts[result.no - 1];
    if (!script) {
        console.error(`序号为 ${result.no} 的脚本不存在！`);
        return;
    }

    execFileSync(resolveScript(script.filename), {stdio: 'inherit'});
});
