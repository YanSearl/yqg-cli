/**
 * @author panezhang
 * @date 2018/5/3-21:06
 * @file vue-ssr-render
 */
/* eslint-disable global-require */

export default process.env.NODE_ENV === 'production'
    ? require('./vue-ssr-render.production')
    : require('./vue-ssr-render.development');
