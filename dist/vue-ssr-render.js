'use strict';

var vueSsrRender = process.env.NODE_ENV === 'production' ? require('./vue-ssr-render.production') : require('./vue-ssr-render.development');

module.exports = vueSsrRender;
