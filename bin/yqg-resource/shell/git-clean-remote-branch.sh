#! /usr/bin/env bash

# 获取脚本所在的文件夹路径
dir=$(cd $(dirname $0)/../script && pwd)

function find_branches_to_be_deleted() {
    git branch -avv \
        | grep 'remotes/origin/release' \
        | awk '{print $1}' \
        | node ${dir}/git-list-remote-branches-to-be-deleted.js
}

function delete_branches() {
    find_branches_to_be_deleted | xargs -n1 -t git push origin --delete
}

find_branches_to_be_deleted
read -p "确认删除以上远程分支吗？（y/n）" yn
case ${yn} in
    [Yy]* ) echo "开始删除远程分支..."; delete_branches; echo "删除完毕";;
    * ) echo "操作取消";;
esac
