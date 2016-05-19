import template from 'art-template/dist/template-debug';
import Swiper from 'iswiper';
import dataManager from '../lib/dataManager';
import tpl from 'raw!./article.html';
import './article.less';

// 图片来自微软 cn.bing.com , 版权归原作者所有
import swiper1 from './swiper1.png';
import swiper2 from './swiper2.png';
import swiper3 from './swiper3.png';
import swiper4 from './swiper4.png';

export default {
    url: '/article/:id',
    render: function () {
        const id = this.params.id;
        const data = dataManager.getData('data');
        const article = data.filter(article => article.id == id)[0];
        const html = template.compile(tpl)({article: article, items: [swiper1, swiper2, swiper3, swiper4]});

        // 可以返回一个 promise
        return new Promise((resolve, reject) => {
            resolve(html);
        });
        // 也可以直接返回 html
        // return html;
    },
    bind: function () {
        const swiper = new Swiper({
            direction: 'horizontal'
        });
        swiper.on('swiped', (prev, current) => {
            console.log('prev', prev);
            console.log('current', current);
        });
    }
};