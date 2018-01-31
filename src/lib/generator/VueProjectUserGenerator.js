/**
 * @author panezhang
 * @date 31/01/2018-17:00
 * @file VueProjectUserGenerator
 */

import prompt from '../prompt';
import VueGenerator from './VueGenerator';

export default class VueProjectUserGenerator extends VueGenerator {

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

        Object.assign(extraRenderData, {port});
        return extraRenderData;
    }

    async onFinish(renderData) {
        const {hyphenName, port} = renderData;
        const defaultConfig = `'${hyphenName}': {port: ${port}, apiHost: 'https://'}`;
        console.log(`Project ${hyphenName} was generated successfully. Please add blow text to proper file.`);
        console.log(`\n- config/default.js\n  ${defaultConfig}`);
        console.log(`\n- gulp.babel.js\n  addYqgVueSPA('${hyphenName}');`);
        await super.onFinish(renderData);
    }

}
