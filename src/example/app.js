import Router from '../index';
import './app.less';
import list from './list/list';
import article from './article/article';

const router = new Router({
    container: '#container',
    enterTimeout: 300,
    leaveTimeout: 300
});

router.push(list)
    .push(article)
    .setDefault('/')
    .init();