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



## Shell Tool

To use shell tool, there are two ways. One is just to type `yqg shell` without arguments, another is using it with arguments which will be passed to the shell script.

Type `yqg shell`, you will see currently available shell tool, just enter a number to exec:

1. git-clean-local-branch.sh 清理本地的 release 分支
2. git-clean-remote-branch.sh 清理远程的 release 分支
3. check-package-json.sh

To using it with arguments, the '../../' will be passed to script 'check-package-json.sh', which means the path of package.json relative to PWD.

```bash
yqg shell check-package-json.sh ../../
```

