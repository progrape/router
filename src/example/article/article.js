import template from 'art-template/dist/template-debug';
import data from '../data';
import tpl from 'raw!./article.html';

export default {
    url: '/article/:id',
    render: function () {
        const id = this.params.id;
        const article = data.filter(article => article.id == id)[0];
        return template.compile(tpl)({article: article});
    },
    bind: function () {

    }
};