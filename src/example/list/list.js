import $ from 'jquery';
import template from 'art-template/dist/template-debug';
import data from '../data';
import tpl from 'raw!./list.html';

export default {
    url: '/',
    render: function (callback) {
        const html = template.compile(tpl)({list: data});
        // async
        setTimeout(() => {
            callback(null, html);
        }, 300);

    },
    bind: function () {

    }
};