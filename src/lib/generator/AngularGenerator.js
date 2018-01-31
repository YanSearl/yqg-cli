/**
 * @author panezhang
 * @date 30/01/2018-17:29
 * @file AngularGenerator angular default generator
 */

import {toCamelCase} from 'strman';

import {resolve, resolveGeneratorTemplate} from '../path';
import prompt from '../prompt';

import BaseGenerator from './BaseGenerator';

const SUB_PROJECT_REG = /yqd_web_admin\/projects\/([A-Za-z0-9-]+)\/src/;

export default class AngularGenerator extends BaseGenerator {

    async getExtraRenderData() {
        const {dest} = this;

        // get appName
        const result = SUB_PROJECT_REG.exec(dest);
        let appName;
        if (result) {
            appName = result[1];
        } else {
            const {promptAppName} = await prompt({
                promptAppName: {
                    description: 'Enter project name',
                    required: true
                }
            });

            appName = promptAppName;
        }

        return {appName: toCamelCase(appName)}; // {appName}
    }

    async getTemplateList(renderData) {
        const {type, dest} = this;
        const templateList = [];
        const srcPath = resolveGeneratorTemplate(`./angular/${type}/**/*.**`);
        const destPath = resolve(dest, renderData.hyphenName);
        templateList.push({srcPath, destPath});
        return templateList;
    }

}
