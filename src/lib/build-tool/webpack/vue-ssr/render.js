/**
 * @author panezhang
 * @date 2017/12/8-下午7:32
 * @file render
 */

import fs from 'fs';
import {createBundleRenderer} from 'vue-server-renderer';

class Render {

    constructor(app, {templatePath, ...options} = {}) {
        const bundle = require('./vue-ssr-server-bundle.json'); // eslint-disable-line
        const clientManifest = require('./public/static/vue-ssr-client-manifest.json'); // eslint-disable-line
        const template = fs.readFileSync(templatePath, 'utf-8');
        this.renderer = createBundleRenderer(bundle, {
            runInNewContext: false,
            clientManifest,
            template,
            ...options
        });
    }

    get() {
        return this.renderer;
    }

}

export default Render;
