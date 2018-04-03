/**
 * @author panezhang
 * @date 31/01/2018-16:59
 * @file VueProjectGenerator
 */

import chalk from 'chalk';

import prompt from '../prompt';
import VueGenerator from './VueGenerator';

function handlePort(port) {
    const digitalPort = parseInt(port, 10);
    if (Number.isNaN(digitalPort)) {
        throw new Error('Port should be parsed into number!');
    }

    return {
        port: `${digitalPort}`
    };
}

export default class VueProjectGenerator extends VueGenerator {

    async getExtraRenderData(commonRenderData) {
        const extraRenderData = await super.getExtraRenderData(commonRenderData);
        const {port} = await prompt({
            port: {
                description: 'Enter default port',
                message: 'Port should not be empty!',
                pattern: /^\d+$/,
                required: true
            }
        });

        Object.assign(extraRenderData, handlePort(port));
        return extraRenderData;
    }

    async onFinish(renderData) {
        const dest = `${this.dest}/${renderData.hyphenName}`;
        console.log(`\n\n请到 ${chalk.yellow(dest)} 目录创建 node_modules 软链接，并添加到 git 中.\n\n`);
    }

}
