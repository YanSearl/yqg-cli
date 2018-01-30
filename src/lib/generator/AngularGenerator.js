/**
 * @author panezhang
 * @date 30/01/2018-17:29
 * @file AngularGenerator
 */

import {toCamelCase} from 'strman';

import {resolve, resolveGeneratorTemplate} from '../path';
import prompt from '../prompt';

import {ANGULAR_TEMPLATE_TYPE} from './constant';
import BaseGenerator from './BaseGenerator';

const SUB_PROJECT_REG = /yqd_web_admin\/projects\/([A-Za-z0-9-]+)\/src/;

export default class AngularGenerator extends BaseGenerator {

    async getExtraRenderData() {
        const {type, dest} = this;

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

        const extraRenderData = {appName: toCamelCase(appName)};
        if (type === ANGULAR_TEMPLATE_TYPE.COMPONENT) {
            const {hasResource} = await prompt({
                hasResource: {
                    description: '是否需要.resource.js文件？(t/f)',
                    message: '请输入t或者f',
                    type: 'boolean',
                    default: 'f',
                    required: true
                }
            });

            Object.assign(extraRenderData, {hasResource});
        }

        return extraRenderData; // {appName, hasResource}
    }

    getTemplateList(renderData) {
        const {type, dest} = this;
        const templateList = [];
        const srcPath = resolveGeneratorTemplate(`./angular/${type}/**/*.**`);
        const destPath = resolve(dest, renderData.hyphenName);
        templateList.push({srcPath, destPath});

        // for angular component with resource
        if (renderData.hasResource) {
            const resourceSrcPath = resolveGeneratorTemplate('./angular/component.resource/**/*.**');
            templateList.push({srcPath: resourceSrcPath, destPath});
        }

        return templateList;
    }

}
