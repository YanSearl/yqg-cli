/**
 * @author KylesLight
 * @date 06/11/2017-5:09 PM
 * @file constant
 */

export const ANGULAR_TEMPLATE_TYPE = {
    COMPONENT: 'component',
    MODAL: 'modal'
};

export const VUE_TEMPLATE_TYPE = {
    COMPONENT: 'component-single',
    COMPONENT_SEPARATED: 'component-separated',
    MODAL: 'modal-base-ui',
    MODAL_CL: 'modal-cl',
    MODAL_EC: 'modal-ec',
    MODEL_MUSE: 'modal-muse',
    PROJECT: 'project',
    PROJECT_SSR: 'project-ssr',
    PROJECT_USER: 'project-user'
};

export const FRAMEWORK_TYPE = {
    ANGULAR: 'angular',
    VUE: 'vue'
};

export const FRAMEWORK_CONF = {
    [FRAMEWORK_TYPE.ANGULAR]: {
        TEMPLATE_TYPE: ANGULAR_TEMPLATE_TYPE,
        TEMPLATE_LIST: Object.values(ANGULAR_TEMPLATE_TYPE)
    },

    [FRAMEWORK_TYPE.VUE]: {
        TEMPLATE_TYPE: VUE_TEMPLATE_TYPE,
        TEMPLATE_LIST: Object.values(VUE_TEMPLATE_TYPE)
    }
};
