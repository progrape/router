import $ from 'jquery';
import template from 'art-template/dist/template-debug';
import data from '../data';
import tpl from 'raw!./list.html';

export default {
    url: '/',
    render: function () {
        return template.compile(tpl)({list: data});
    },
    bind: function () {

    }
};