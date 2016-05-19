### Simple Router

A very simple router, just for the **demo** of [weui](https://github.com/weui/weui)

### 预览

![image](https://cloud.githubusercontent.com/assets/4652816/14374852/6cc83df2-fd8d-11e5-8721-097136667f89.png)

https://progrape.github.io/router

### 使用

HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>example</title>
</head>
<body>
    <div id="container"></div>
    <script src="path/to/router.js"></script>
</body>
</html>
```

JavaScript

```javascript
var router = new Router({
    container: '#container'
});
var home = {
    url: '/',
    className: 'home',
    render: function (){
        return '<h1>home</h1>';
    }
};
var post = {
    url: '/post/:id',
    className: 'post',
    render: function (){
        var id = this.params.id;
        return '<h1>post</h1>';
    }
};
router.push(home).push(post).setDefault('/').init();
```

### 运行示例

```shell
git clone https://github.com/progrape/router
cd router
npm install
npm start
```

### API

#### Router([option])

参数 `option` 是可选的，下面是该参数可选的属性。

|属性       |类型   |默认值        |描述|
|--------       |---    |---            |---
|container      |String |'#container'   | `container` 容器的选择器
|enter          |String |'enter'        | 该页面出现时添加的类名，`enterTimeout` 为 0 时会被忽略
|enterTimeout   |Number |0              | 在这个时间之后移除添加的 `enter` 类名
|leave          |String |'leave'        | 该页面离开时添加的类名，`lieaveTimeout` 为 0 时会被忽略
|leaveTimeout   |Number |0              | 在这个时间之后移除该页面的 DOM


#### 实例方法

以下方法执行完毕后均返回实例本身。

##### push(route)

添加路由页面的配置。下面是 `route` 参数的属性。


|属性       |类型   |描述
|-----------|-------|---
|url        |String | 以 `/` 开头的 url，会体现在 hash，支持参数，如：`/user/:userId/post/:posdId`
|className  |String | 可选，该页面可以添加的额外类名，以便控制该页面下的样式
|render     |function| 页面渲染方法，支持同步和异步, 可以直接返回 html 字符串，可以返回 `promise` 对象，也可以接收 `callback` 参数
|bind       |function| 执行绑定事件的方法，`this` 指向当前页面容器

route 示例如下:

同步

```javascript
{
    url: '/home',
    className: 'home',
    render: function (){
        return '<button>home</button>';
    },
    bind: function (){
        $(this).on('click', 'button', function (){
            // do something
        });
    }
}
```

promise

```javascript
{
    url: '/home',
    className: 'home',
    render: function (){
        return new Promise(function (resolve, reject){
            resolve('<button>home</button>');
        });
    },
    bind: function (){
        $(this).on('click', 'button', function (){
            // do something
        });
    }
}
```

callback

```javascript
{
    url: '/home',
    className: 'home',
    render: function (callback){
        callback(null, '<button>home</button>');
    },
    bind: function (){
        $(this).on('click', 'button', function (){
            // do something
        });
    }
}
```


##### setDefault(url)

设置页面启动时默认跳转的 url。

##### init()

启动页面，在调用完 `push` 和 `setDefault` 方法后调用，主要完成 `hashchange` 的事件监听和跳转默认页面的工作。

### License

The MIT License(http://opensource.org/licenses/MIT)

请自由地享受和参与开源
