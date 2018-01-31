/**
 * @author panezhang
 * @date 31/01/2018-16:59
 * @file AngularComponentGenerator
 */

import {resolve, resolveGeneratorTemplate} from '../path';
import prompt from '../prompt';

import AngularGenerator from './AngularGenerator';

export default class AngularComponentGenerator extends AngularGenerator {

    async getExtraRenderData(commonRenderData) {
        const extraRenderData = await super.getExtraRenderData(commonRenderData);
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
        return extraRenderData; // {appName, hasResource}
    }

    async getTemplateList(renderData) {
        const templateList = await super.getTemplateList(renderData);

        if (renderData.hasResource) {
            const {dest} = this;
            const srcPath = resolveGeneratorTemplate('./angular/component.resource/**/*.**');
            const destPath = resolve(dest, renderData.hyphenName);
            templateList.push({srcPath, destPath});
        }

        return templateList;
    }

}
