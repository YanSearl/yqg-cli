#!/usr/bin/env bash

function find_local_release_branched() {
    git branch | grep 'release'
}

function delete_local_release_branches() {
    find_local_release_branched | xargs -n1 -t git branch -D
}

find_local_release_branched
read -p "确认删除以上本地分支吗？（y/n）" yn
case ${yn} in
    [Yy]* ) echo "开始删除本地分支..."; delete_local_release_branches; echo "删除完毕";;
    * ) echo "操作取消";;
esac
