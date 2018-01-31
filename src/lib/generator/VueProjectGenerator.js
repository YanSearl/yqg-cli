/**
 * @author panezhang
 * @date 31/01/2018-16:59
 * @file VueProjectGenerator
 */

import prompt from '../prompt';
import VueGenerator from './VueGenerator';

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

}
