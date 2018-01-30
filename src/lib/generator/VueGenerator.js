/**
 * @author panezhang
 * @date 30/01/2018-17:31
 * @file VueGenerator
 */

import {resolve, resolveGeneratorTemplate} from '../path';
import prompt from '../prompt';

import {VUE_TEMPLATE_TYPE} from './constant';
import BaseGenerator from './BaseGenerator';

function handlePort(port) {
    const digitalPort = parseInt(port, 10);
    if (Number.isNaN(digitalPort)) {
        throw new Error('Port should be parsed into number!');
    }

    return {
        port: `${digitalPort}`,
        BrowserSyncPort: `${digitalPort + 1}`,
        BrowserSyncUIPort: `${digitalPort + 2}`
    };
}

export default class VueGenerator extends BaseGenerator {

    async getExtraRenderData() {
        const {type} = this;

        // handle for project
        if (type === VUE_TEMPLATE_TYPE.PROJECT) {
            const {port} = await prompt({
                port: {
                    description: 'Enter default port',
                    message: 'Port should not be empty!',
                    pattern: /^\d+$/,
                    required: true
                }
            });

            return handlePort(port);
        }

        return null;
    }

    getTemplateList(renderData) {
        const {type, dest} = this;
        const templateList = [];
        const srcPath = resolveGeneratorTemplate(`./vue/${type}/**/*.**`);
        const destPath = resolve(dest, renderData.hyphenName);
        templateList.push({srcPath, destPath});
        return templateList;
    }

}
