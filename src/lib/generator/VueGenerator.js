/**
 * @author panezhang
 * @date 30/01/2018-17:31
 * @file VueGenerator vue default generator
 */

import {resolve, resolveGeneratorTemplate} from '../path';
import BaseGenerator from './BaseGenerator';

export default class VueGenerator extends BaseGenerator {

    async getTemplateList(renderData) {
        const {type, dest} = this;
        const templateList = [];
        const srcPath = resolveGeneratorTemplate(`./vue/${type}/**/*.**`);
        const destPath = resolve(dest, renderData.hyphenName);
        templateList.push({srcPath, destPath});
        return templateList;
    }

}
