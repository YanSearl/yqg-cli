/**
 * @author panezhang
 * @date 30/01/2018-17:10
 * @file BaseGenerator
 */

import moment from 'moment';

import {signature} from '../constant';
import logger from '../logger';

import genFiles from './util/genFiles';
import getAuthorInfo from './util/getAuthorInfo';
import handleName from './util/handleName';

export default class BaseGenerator {

    constructor({framework, type, name, dest}) {
        Object.assign(this, {framework, type, name, dest});
    }

    async getCommonRenderData() {
        const timeCreated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS');
        const {name, dest} = this;

        // {capName, camelName, hyphenName, capFullName, camelFullName, hyphenFullName, hyphenShortName}
        const nameInfo = handleName(name, dest);

        // {username, email}
        const authorInfo = await getAuthorInfo();

        return {
            signature,
            timeCreated,
            ...authorInfo,
            ...nameInfo
        };
    }

    async getExtraRenderData(commonRenderData) { // eslint-disable-line
        // to be override
        return {};
    }

    async getTemplateList(renderData) { // eslint-disable-line
        // to be override
        return [];
    }

    async exec() {
        const commonRenderData = await this.getCommonRenderData();
        const extraRenderData = await this.getExtraRenderData(commonRenderData);
        const renderData = {...commonRenderData, ...extraRenderData};
        const templateList = await this.getTemplateList(renderData);

        logger.time('Generating');
        await Promise.all(templateList.map(({srcPath, destPath}) => genFiles({srcPath, destPath, renderData})));
        logger.timeEnd('Generating');

        await this.onFinish(renderData);
    }

    async onFinish(renderData) { // eslint-disable-line
        // to be override
    }

}
