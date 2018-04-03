# Yqg Command Line Tools
## Getting Start

First, install from npm globally,

```bash
npm i -g @yqg/cli
```

Then, you can type the command to use yqg-cli,

```bash
yqg vue
yqg angular
yqg shell
```

And that's all.



## Introduction

**yqg-cli** has 8 commands in total now, which can be divided into three categories:

- `scaffold` to generate components and projects of vue/angular
  - vue
  - angular
- `shell tool` to help saving time
  - clean local release branch
  - clean remote release branch
  - check package json && auto install dependencies when changed
- `build tool` to start a dev server or build binary code for release
  - clean
  - copy
  - bundle
  - build
  - start





## Scaffold

Using scaffold is quiet simple, just type `yqg vue` or `yqg angular`, and follow the prompt to type in a few words, you will get your components and projects generated.

Currently supported templates:

- vue
  - component-single: single file component recommanded by Evan You
  - component-separated: component with html, javascript, css in separated file
  - modal-base-ui
  - modal-cl
  - modal-ec
  - modal-muse
  - project: standalone project
  - project-user: project can be used only in yqg_web_user
- angular
  - component
  - modal

To be supported **in the future**:

- [] angular
  - [] project
- [] react
  - [] component
  - [] modal
  - [] project
- [] vue project
  - [] auto create soft link
  - [] support create projects standalone which not in yqd_web_admin





## Shell Tool

To use shell tool, there are two ways. One is just to type `yqg shell` without arguments, another is using it with arguments which will be passed to the shell script.

Type `yqg shell`, you will see currently available shell tool, just enter a number to exec:

1. git-clean-local-branch.sh:  clean all local release branches which start with 'release'
2. git-clean-remote-branch.sh: clean remote release to keep a few latest branches per bussiness
3. check-package-json.sh

To using it with arguments, the '../../' will be passed to script 'check-package-json.sh', which means the path of package.json relative to PWD.

```bash
yqg shell check-package-json.sh ../../
```



## Build Tool

Build tool come up with five scripts for `clean`, `copy`, `bunlde`, `build` and `start`.

- clean: clean the binary files
- copy: copy static files
- bundle: bundle the client (if has) and server javascript file(s)
- build: clean, copy && bundle
- start: start a dev server with HMR

In order to use yqg-cli to build/develop your projects, you need to follow these three steps.

### Step 1: setup config 

As yqg-cli build tool is depending on [**node-config**](https://github.com/lorenwest/node-config) to get config, you need to create a folder named `config` in your project root, and a file named `default.js`, which will by used by [**node-config**](https://github.com/lorenwest/node-config).

```javascript
/*
 * @file config/default.js
 */
const path = require('path');

const PWD = process.cwd();
const resolvePwd = (...args) => path.resolve(PWD, ...args);

module.exports = {
    build: {
        framework: 'angular', // angular/vue/react/none
        packageJsonPath: './package.json',

        copy: { // src -> dest map
            paths: {
                'src/public': 'build/public'
            }
        },

        global: { // globals used by webpack DefinePlugin
            __WEB_USER_HOST__: JSON.stringify('https://test.yangqianguan.com')
        },

        alias: { // alias used by webpack resolve
            'yqg-common': resolvePwd('../common/src')
        },

        htmlPlugin: { // html plugin options
            template: resolvePwd('./src/fe/index.html'),
            favicon: resolvePwd('./src/fe/fav.png')
        },

        clientEntry: './src/fe/main.js',
        serverEntry: './src/server.js'
    },

    run: {
        port: 62570,
        webHost: 'http://localhost:8000',
        apiHost: 'http://localhost:8001'
    }
};

```

### Step 2: setup dependencies and package.json

Install yqg-cli as a devDependencies:

```bash
npm i @yqg/cli -DE
```

Modify the scripts field in package.json:

```json
"scripts": {
    "clean": "yqg clean",
    "copy": "yqg copy",
    "bundle": "yqg bundle",
    "build": "yqg build",
    "start": "yqg start",
    "prestart": "yqg shell check-package-json.sh ../../"
}
```

### Step 3: send ready signal in server.js

```javascript
server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`); 
    // add code blow, in order to notify the 'start' script that server is ready
    if (process.send) {
        process.send({ready: true});
    }
});
```

After these three steps, now cd to your project root dir, and run `npm start` to start the dev server, or run `npm build` to build your project for release.

Note: you can use a global `yqg` command to run `yqg start` or `yqg build`, but this is not recommanded, because different projects may use different versions of `yqg-cli`.

### Addition: full config options list

Assum `DEV` is true when NODE_ENV is not one of test/feat/prod.

| Field                 | Default Value                              | Remark                                |
| --------------------- | ------------------------------------------ | ------------------------------------- |
| build.debug           | DEV                                        |                                       |
| build.vueDebug        | DEV                                        | 是否开启 vue debug 模式               |
| build.verbose         | DEV                                        | 是否开启 webpack verbose 模式         |
| build.mode            | DEV ? 'development' : 'production'         | webpack mode                          |
| build.framework       | 'react'                                    | react/vue/angular/none                |
| build.hash            | DEV ? 'hash' : 'chunkhash'                 |                                       |
| build.cssHash         | DEV ? 'hash' : 'contenthash'               |                                       |
| build.srcMap          | DEV                                        |                                       |
| build.packageJsonPath | 'package.json'                             | copy 的 package.json 的路径           |
| build.global          | see blow                                   | used by webpack.DefinePlugin          |
| build.serverEntry     | './server.js'                              |                                       |
| build.server          | {}                                         | 用于覆盖 server.config.js，不推荐使用 |
| build.alias           | see blow                                   | used by webpack.resolve               |
| build.provide         | see blow                                   | used by webpack.ProvidePlugin         |
| build.htmlPlugin      | {}                                         | options for html-webpack-plugin       |
| build.clientEntry     | './common/app/index.js'                    |                                       |
| build.client          | {}                                         | 用于覆盖 client.config.js，不推荐使用 |
| build.clean           | see blow                                   | yqg clean config                      |
| build.copy            | see blow                                   | yqg copy config                       |
| build.devProxy        | ['/api', '/admin', '/api-web', '/chidori'] | dev server proxy prefix list          |
| run.apiHost           | ''                                         |                                       |
| run.webHost           | ''                                         |                                       |
| run.port              | 8080                                       |                                       |

#### build.global

| key     | value     |
| ---- | ---- |
| `__STAGE__` | process.env.NODE_ENV |
| `__DEBUG__` | DEV |
| `__VUE_DEBUG__` | DEV |
| `__CDN_HOST__` | '' |
| `__API_HOST__` | get from run.apiHost |
| `__WEB_HOST__` | get from run.webHost |
| `__CHIDORI_API_HOST__` | decided by stage |
| `__CHIDORI_HOST__` | decided by stage |

#### build.alias

##### framework: vue

| key  | value                  |
| ---- | ---------------------- |
| vue$ | vue/dist/vue.common.js |

#### build.provide

##### framewok: angular

| key | value |
| ------------- | ------ |
| $             | jquery |
| jQuery        | jquery |
| window.jQuery | jquery |

##### framework: react

| key   | value |
| ----- | ----- |
| React | react |

#### build.clean

| key    | value | remark                     |
| ------ | ----- | -------------------------- |
| remove | build | string or array of strings |
| ensure | build | string or array of strings |

#### build.copy

| key     | value    | remark                                        |
| ------- | -------- | --------------------------------------------- |
| paths   | see blow | src —> dest map                               |
| replace | true     | whether to replace package.json scripts field |

#### build.copy.paths

| src                   | dest                |
| --------------------- | ------------------- |
| config                | build/config        |
| public                | build/public        |
| static                | build/public/static |
| `[PACKAGE_JSON_PATH]` | build/package.json  |

