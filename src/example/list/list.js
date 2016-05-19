import 'weui.js';
import template from 'art-template/dist/template-debug';
import remote from '../lib/data';
import dataManager from '../lib/dataManager';
import tpl from 'raw!./list.html';

export default {
    url: '/',
    render: function (callback) {

        const data = dataManager.getData('data');
        if (data) {
            const html = template.compile(tpl)({list: data});

            callback(null, html);
        }
        else {
            // 模拟异步加载数据
            $.weui.loading('加载中...');
            setTimeout(() => {
                dataManager.setData('data', remote);
                const html = template.compile(tpl)({list: remote});
                callback(null, html);
                $.weui.hideLoading();
            }, 800);
        }
    },
    bind: function () {

    }
};